import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfiguration, ConfigurationKeyPaths } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOGGER_MODULE_OPTIONS } from './shared/logger/logger.constants';
import { ApiModule } from './modules/test/api.module';
import { SystemModule } from './modules/admin/system/system.module';

// 声明module加载配置文件信息、日志、数据库等
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [getConfiguration],
			envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'] // 区分先后加载顺序
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService<ConfigurationKeyPaths>) => ({
				autoLoadEntities: true,
				type: configService.get<any>('database.type'),
				host: configService.get<string>('database.host'),
				port: configService.get<number>('database.port'),
				username: configService.get<string>('database.username'),
				password: configService.get<string>('database.password'),
				database: configService.get<string>('database.database'),
				synchronize: configService.get<boolean>('database.synchronize'),
				logging: configService.get<boolean>('database.logging'),
				timezone: configService.get<string>('database.timezone')
				// 自定义日志
			}),
			inject: [ConfigService]
			// inject: [ConfigService, LOGGER_MODULE_OPTIONS],
		}),
		ApiModule,
		SystemModule
	]
})
export class AppModule {}
