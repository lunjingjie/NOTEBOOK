import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { SystemModule } from './system/system.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ADMIN_PREFIX } from './admin.constants';
import { AuthGuard } from './core/guards/auth.guard';

@Module({
	imports: [LoginModule, SystemModule,
    // 增加admin的接口前缀
    RouterModule.register([
      {
        path: ADMIN_PREFIX,
        children: [
          { path: 'sys', module: SystemModule },
        ],
      },
      {
        path: ADMIN_PREFIX,
        module: LoginModule,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [SystemModule],
})
export class AdminModule {}
