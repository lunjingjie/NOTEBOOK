import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ADMIN_PREFIX } from '../../admin.constants';
import { SysRole } from 'src/entities/SysRole';
import { SysRoleService } from './role.service';
import { PaginatedResponse, RoleInfo } from './role.class';
import { CreateRoleDto, DeleteRoleDto, InfoRoleDto, PageSearchDto, UpdateRoleDto } from './role.dto';
import { ApiException } from 'src/exceptions/api.exception';
import { AdminUser } from '../../core/decorators/admin-user.decorator';
import { IAdminUser } from '../../admin.interface';
import { PageOptionsDto } from 'src/common/dto/page.dto';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('角色模块')
@Controller('role')
export class SysRoleController {
	constructor(private roleService: SysRoleService) {}

	@ApiOperation({ summary: '获取角色列表' })
	@ApiResponse({ type: [SysRole] })
	@Get('list')
	async list(): Promise<SysRole[]> {
		return await this.roleService.list();
	}

	@ApiOperation({ summary: '分页查询角色列表' })
	@ApiResponse({ type: [SysRole] })
	@Post('page')
	async page(@Body() param: PageSearchDto, @Query() pagination: PageOptionsDto): Promise<PaginatedResponse<SysRole>> {
		const [list, total] = await this.roleService.page(param, pagination);
		return {
			list,
			pagination: {
				total,
				page: pagination.page,
				size: pagination.size
			}
		};
	}

	@ApiOperation({ summary: '删除角色' })
	@Post('delete')
	async delete(@Body() dto: DeleteRoleDto): Promise<void> {
		const count = await this.roleService.countUserIdByRole(dto.roleIds);
		if (count > 0) {
			throw new ApiException(10008);
		}

		await this.roleService.delete(dto.roleIds);
		// TODO 刷新在线用户权限
	}

	@ApiOperation({ summary: '新增角色' })
	@Post('add')
	async add(@Body() dto: CreateRoleDto, @AdminUser() user: IAdminUser): Promise<void> {
    console.log(user);
		await this.roleService.add(dto, user.uid);
	}

  @ApiOperation({ summary: '更新角色' })
	@Post('update')
	async update(@Body() dto: UpdateRoleDto): Promise<void> {
    await this.roleService.update(dto);
    // TODO 刷新在线用户权限
  }

  @ApiOperation({ summary: '获取角色信息' })
  @ApiOkResponse({ type: RoleInfo })
	@Get('info')
	async info(@Query() dto: InfoRoleDto): Promise<RoleInfo> {
    return await this.roleService.info(dto.roleId);
  }
}
