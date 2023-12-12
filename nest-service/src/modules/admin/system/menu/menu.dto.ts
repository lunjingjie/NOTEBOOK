import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsIn,
	IsInt,
	IsOptional,
	IsString,
	Min,
	MinLength,
	ValidateIf
} from 'class-validator';

export class CreateMenuDto {
	@ApiProperty({ description: '菜单类型' })
	@IsIn([0, 1, 2])
	type: number;

	@ApiProperty({ description: '父级菜单' })
	@IsInt()
	parentId: number;

	@ApiProperty({ description: '菜单或权限名称' })
	@IsString()
	@MinLength(2)
	name: string;

	@ApiProperty({ description: '排序' })
	@IsInt()
	@Min(0)
	orderNum: number;

	@ApiProperty({ description: '前端路由地址' })
	@IsString()
	@ValidateIf((o) => o.type !== 2)
	router: string;

	@ApiProperty({ description: '菜单是否显示', required: false, default: true })
	@IsBoolean()
	@ValidateIf((o) => o.type !== 2)
	readonly isShow: boolean;

	@ApiProperty({ description: '开启页面缓存', required: false, default: true })
	@IsBoolean()
	@ValidateIf((o) => o.type === 1)
	readonly keepalive: boolean;

	@ApiProperty({ description: '是否外链', required: false, default: false })
	@IsBoolean()
	readonly isExt: boolean;

	@ApiProperty({ description: '外链打开方式', required: false, default: 1 })
	@IsIn([1, 2])
	@ValidateIf((o) => o.isExt === true && o.type === 1)
	readonly openMode: number;

	@ApiProperty({ description: '菜单图标', required: false })
	@IsString()
	@IsOptional()
	@ValidateIf((o) => o.type !== 2)
	icon: string;

	@ApiProperty({ description: '对应权限' })
	@IsString()
	@IsOptional()
	@ValidateIf((o) => o.type === 2)
	perms: string;

	@ApiProperty({ description: '菜单路由路径或外链' })
	@ValidateIf((o) => o.type !== 2)
	@IsString()
	@IsOptional()
	viewPath: string;
}
