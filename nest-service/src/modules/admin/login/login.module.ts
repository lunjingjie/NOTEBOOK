import { Module } from '@nestjs/common';
import { SystemModule } from '../system/system.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
	imports: [SystemModule],
	controllers: [LoginController],
	providers: [LoginService],
	exports: [LoginService]
})
export class LoginModule {}
