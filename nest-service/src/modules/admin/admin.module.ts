import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { SystemModule } from './system/system.module';

@Module({
	imports: [LoginModule, SystemModule],
  providers: [],
  exports: [SystemModule],
})
export class AdminModule {}
