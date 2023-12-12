import { Module } from '@nestjs/common';
import { SysUserController } from './user/user.controller';
import { SysUserService } from './user/user.service';
import { SysUser } from 'src/entities/SysUser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysRoleController } from './role/role.controller';
import { SysRoleService } from './role/role.service';
import { rootRoleIdProvider } from '../core/provider/root-role-id.provider';
import { ROOT_ROLE_ID } from '../admin.constants';
import { SysRole } from 'src/entities/SysRole';
import { SysUserRole } from 'src/entities/SysUserRole';
import { SysRoleMenu } from 'src/entities/SysRoleMenu';
import { SysRoleDepartment } from 'src/entities/SysRoleDepartment';

@Module({
	imports: [TypeOrmModule.forFeature([SysUser, SysRole , SysUserRole, SysRoleMenu, SysRoleDepartment])],
	controllers: [SysUserController, SysRoleController],
	providers: [rootRoleIdProvider(), SysUserService, SysRoleService],
	exports: [SysUserService, ROOT_ROLE_ID, TypeOrmModule]
})
export class SystemModule {}
