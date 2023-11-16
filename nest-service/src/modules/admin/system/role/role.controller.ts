import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ADMIN_PREFIX } from '../../admin.constants';
import { SysRole } from 'src/entities/SysRole';
import { SysRoleService } from './role.service';
import { PaginatedResponse } from './role.class';
import { CreateRoleDto, DeleteRoleDto, PageSearchDto } from './role.dto';
import { ApiException } from 'src/exceptions/api.exception';
import { AdminUser } from '../../core/decorators/admin-user.decorator';
import { IAdminUser } from '../../admin.interface';

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
	@Get('page')
	async page(@Query() param: PageSearchDto): Promise<PaginatedResponse<SysRole>> {
		const [list, total] = await this.roleService.page(param);
		return {
			list,
			pagination: {
				total,
				page: param.page,
				size: param.size
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
		await this.roleService.add(dto, user.uid);
	}

	update() {}

	info() {}
}
