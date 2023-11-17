import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { SysRole } from 'src/entities/SysRole';
import { EntityManager, In, Like, Not, Repository } from 'typeorm';
import { ROOT_ROLE_ID } from '../../admin.constants';
import { CreateRoleId, RoleInfo } from './role.class';
import { SysRoleMenu } from 'src/entities/SysRoleMenu';
import { SysRoleDepartment } from 'src/entities/SysRoleDepartment';
import { difference, includes, isEmpty, isNull, isUndefined } from 'lodash';
import { CreateRoleDto, PageSearchDto, UpdateRoleDto } from './role.dto';
import { SysUserRole } from 'src/entities/SysUserRole';
import { PageOptionsDto } from 'src/common/dto/page.dto';

@Injectable()
export class SysRoleService {
	constructor(
		@InjectRepository(SysRole) private roleRepository: Repository<SysRole>,
		@InjectRepository(SysRoleMenu) private roleMenuRepo: Repository<SysRoleMenu>,
		@InjectRepository(SysRoleDepartment) private roleDeptRepo: Repository<SysRoleDepartment>,
		@InjectRepository(SysUserRole) private userRoleRepo: Repository<SysUserRole>,
		@InjectEntityManager() private entityManager: EntityManager,
		@Inject(ROOT_ROLE_ID) private rootRoleId: number
	) {}

	/**
	 * 查询所有角色，除去管理员角色
	 * @returns SysRole[]
	 */
	async list(): Promise<SysRole[]> {
		const result = await this.roleRepository.find({
			where: { id: Not(this.rootRoleId) }
		});

		return result;
	}

	/**
	 * 查询角色条数
	 */
	async count(): Promise<number> {
		const count = await this.roleRepository.count({
			where: {
				id: Not(this.rootRoleId)
			}
		});

		return count;
	}

	/**
	 * 根据角色id获取角色信息、菜单信息、部门信息
	 * @param rid 角色id
	 * @returns
	 */
	async info(rid: number): Promise<RoleInfo> {
		const roleInfo = await this.roleRepository.findOne({
			where: { id: rid }
		});

		const menus = await this.roleMenuRepo.find({
			where: { roleId: rid }
		});

		const depts = await this.roleDeptRepo.find({
			where: { roleId: rid }
		});

		return {
			roleInfo,
			menus,
			depts
		};
	}

	/**
	 * 根据角色id删除角色、关联菜单、关联部门
	 * @param roleIds 角色ids
	 */
	async delete(roleIds: number[]): Promise<void> {
		if (includes(roleIds, this.rootRoleId)) {
			throw new Error('can not delete root');
		}

		this.entityManager.transaction(async (manager) => {
			await manager.delete(SysRole, roleIds);
			await manager.delete(SysRoleMenu, { roleId: In(roleIds) });
			await manager.delete(SysRoleDepartment, { roleId: In(roleIds) });
		});
	}

	async add(param: CreateRoleDto, uid: number): Promise<CreateRoleId> {
		const { name, label, remark, menus, depts } = param;
		const role = await this.roleRepository.insert({
			name,
			label,
			remark,
			userId: `${uid}`
		});
		const { identifiers } = role;
		console.log(`********* ${identifiers} *******************`);
		const roleId = parseInt(identifiers[0].id);
		// 插入角色菜单关联表
		if (menus && menus.length) {
			const insertRows = menus.map((m) => {
				return {
					roleId,
					menuId: m
				};
			});
			await this.roleMenuRepo.insert(insertRows);
		}

		// 插入角色部门关联表
		if (depts && depts.length) {
			const insertRows = depts.map((d) => {
				return {
					roleId,
					departmentId: d
				};
			});
			await this.roleDeptRepo.insert(insertRows);
		}

		return {
			roleId
		};
	}

	/**
	 * 更新角色，更新关联表信息
	 * @param params 更新角色对象
	 * @returns
	 */
	async update(params: UpdateRoleDto): Promise<SysRole> {
		const { roleId, name, label, remark, menus, depts } = params;
		// 更新角色信息
		const role = await this.roleRepository.save({
			roleId,
			name,
			label,
			remark
		});
		// 获取角色关联的菜单
		const originMenuRows = await this.roleMenuRepo.find({
			where: { roleId }
		});
		const originMenus = originMenuRows.map((m) => m.menuId);
		// 获取角色关联的部门
		const originDeptRows = await this.roleDeptRepo.find({
			where: { roleId }
		});
		const originDepts = originDeptRows.map((d) => d.departmentId);

		// 对比关联菜单、部门的更新差异
		const insertMenuIds = difference(menus, originMenus);
		const deleteMenuIds = difference(originMenus, menus);
		const insertDeptIds = difference(depts, originDepts);
		const deleteDeptIds = difference(originDepts, depts);

		// 执行事务
		await this.entityManager.transaction(async (manager) => {
			// 菜单新增和删除
			if (insertMenuIds.length) {
				const insertRows = insertMenuIds.map((id) => ({
					roleId,
					menuId: id
				}));
				await manager.insert(SysRoleMenu, insertRows);
			}

			if (deleteMenuIds.length) {
				const roleMenuIds = originMenuRows
					.filter((row) => includes(deleteMenuIds, row.menuId))
					.map((row) => row.id);

				await manager.delete(SysRoleMenu, roleMenuIds);
			}
			// 部门新增和删除
			if (insertDeptIds.length) {
				const insertRows = insertDeptIds.map((id) => ({
					roleId,
					departmentId: id
				}));
				await manager.insert(SysRoleDepartment, insertRows);
			}

			if (deleteDeptIds.length) {
				const roleDepartmentIds = originDeptRows
					.filter((row) => includes(deleteDeptIds, row.departmentId))
					.map((row) => row.id);

				await manager.delete(SysRoleDepartment, roleDepartmentIds);
			}
		});

		// TODO 若有关联菜单变化，则通过websocket通知前端重新获取
		return role;
	}

	/**
	 * 分页查询角色列表
	 * @param param
	 * @returns
	 */
	async page(param: PageSearchDto, pagination: PageOptionsDto): Promise<[SysRole[], number]> {
    const { size, page } = pagination;
    const condition = {};
    Object.keys(param).forEach((key) => {
      if (param[key]) {
        condition[key] = Like(`%${param[key]}%`);
      }
    });
    console.log(condition);
		const result = await this.roleRepository.findAndCount({
			where: {
				id: Not(this.rootRoleId),
				...condition,
			},
			order: {
				id: 'ASC'
			},
			take: size,
			skip: (page - 1) * size
		});

		return result;
	}

	/**
	 * 根据用户id查询角色信息
	 * @param userId
	 * @returns
	 */
	async getRoleIdByUser(userId: number): Promise<number[]> {
		const userRoleRows = await this.userRoleRepo.find({
			where: { userId }
		});

		if (isEmpty(userRoleRows)) {
			return [];
		}

		return userRoleRows.map((row) => row.roleId);
	}

	/**
	 * 根据角色id集合统计用户数
	 * @param ids
	 * @returns
	 */
	async countUserIdByRole(ids: number[]): Promise<number | never> {
		if (includes(ids, this.rootRoleId)) {
			throw new Error('Not Support Delete Root');
		}

		return await this.userRoleRepo.count({
			where: { roleId: In(ids) }
		});
	}
}
