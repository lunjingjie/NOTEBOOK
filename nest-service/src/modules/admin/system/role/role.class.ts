import { ApiProperty } from '@nestjs/swagger';
import { SysDepartment } from 'src/entities/SysDepartment';
import { SysRole } from 'src/entities/SysRole';
import { SysRoleDepartment } from 'src/entities/SysRoleDepartment';
import { SysRoleMenu } from 'src/entities/SysRoleMenu';

export class RoleInfo {
	@ApiProperty({
		type: SysRole
	})
	roleInfo: SysRole;

	@ApiProperty({
		type: [SysRoleMenu]
	})
	menus: SysRoleMenu[];

	@ApiProperty({
		type: [SysRoleDepartment]
	})
	depts: SysRoleDepartment[];
}

export class CreateRoleId {
	roleId: number;
}

export class Pagination {
  @ApiProperty({
    description: '总条数'
  })
  total: number;

  @ApiProperty({
    description: '当前页码'
  })
  page: number;

  @ApiProperty({
    description: '当页条数'
  })
  size: number;
}

export class PaginatedResponse<T> {
  list: Array<T>;

  @ApiProperty()
  pagination: Pagination;
}
