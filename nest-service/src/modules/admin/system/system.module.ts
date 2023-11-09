import { Module } from '@nestjs/common';
import { SysUserController } from './user/user.controller';
import { SysUserService } from './user/user.service';
import { SysUser } from 'src/entities/SysUser';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
    TypeOrmModule.forFeature([
      SysUser,
    ]),
  ],
	controllers: [SysUserController],
	providers: [SysUserService],
  exports: [SysUserService],
})
export class SystemModule {}
