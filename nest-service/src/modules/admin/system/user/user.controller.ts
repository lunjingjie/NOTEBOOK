import { Controller, Get, Query } from '@nestjs/common';
import { SysUserService } from './user.service';
import { UserInfo } from './user.class';

@Controller('user')
export class SysUserController {
	constructor(private userService: SysUserService) {}
	@Get('findUserByUserName')
	async findUserByUsername(@Query('username') username: string): Promise<UserInfo> {
		return await this.userService.findUserByUserName(username);
	}
}
