import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysUser } from 'src/entities/SysUser';
import { Repository } from 'typeorm';

@Injectable()
export class SysUserService {
	constructor(@InjectRepository(SysUser) private userRepository: Repository<SysUser>) {}

	async findUserByUserName(username: string): Promise<SysUser | undefined> {
		return await this.userRepository.findOne({
			where: {
				username,
				status: 1
			}
		});
	}
}
