import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, Matches, Min, MinLength } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page.dto';

export class CreateRoleDto {
	@ApiProperty({
		description: '角色名称'
	})
  @IsString()
  @MinLength(2)
	name: string;

  @ApiProperty({
		description: '角色唯一标识'
	})
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
	label: string;

  @ApiProperty({
		description: '备注',
    required: false,
	})
  @IsString()
  @IsOptional()
	remark: string;

  @ApiProperty({
		description: '角色关联菜单',
    required: false,
	})
  @IsArray()
  @IsOptional()
	menus: number[];

  
  @ApiProperty({
		description: '角色关联部门',
    required: false,
	})
  @IsArray()
  @IsOptional()
	depts: number[];
}

export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty({
    description: '角色id'
  })
  @IsInt()
  @Min(0)
  roleId: number;
}

export class PageSearchDto extends PageOptionsDto {
  @ApiProperty({
    required: false,
    description: '角色名称',
  })
  @IsString()
  @IsOptional()
  name: '';

  @ApiProperty({
    required: false,
    description: '角色唯一标识',
  })
  @IsString()
  @IsOptional()
  label: '';

  @ApiProperty({
    required: false,
    description: '备注',
  })
  @IsString()
  @IsOptional()
  remark: '';
}

export class DeleteRoleDto {
  @ApiProperty({
    description: '需要删除的角色ID列表',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  roleIds: number[];
}