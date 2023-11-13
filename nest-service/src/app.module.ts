import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfiguration, ConfigurationKeyPaths } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOGGER_MODULE_OPTIONS } from './shared/logger/logger.constants';
import { ApiModule } from './modules/test/api.module';
import { SystemModule } from './modules/admin/system/system.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoggerModuleOptions, WinstonLogLevel } from './shared/logger/logger.interface';
import { TypeORMLoggerService } from './shared/logger/typeorm-logger.service';
import { LoggerModule } from './shared/logger/logger.module';

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
			useFactory: (
				configService: ConfigService<ConfigurationKeyPaths>,
				loggerOptions: LoggerModuleOptions
			) => ({
				autoLoadEntities: true,
				type: configService.get<any>('database.type'),
				host: configService.get<string>('database.host'),
				port: configService.get<number>('database.port'),
				username: configService.get<string>('database.username'),
				password: configService.get<string>('database.password'),
				database: configService.get<string>('database.database'),
				synchronize: configService.get<boolean>('database.synchronize'),
				logging: configService.get<boolean>('database.logging'),
				timezone: configService.get<string>('database.timezone'),
				// 自定义日志
				logger: new TypeORMLoggerService(
					configService.get('database.logging'),
					loggerOptions
				)
			}),
			inject: [ConfigService, LOGGER_MODULE_OPTIONS]
		}),
		// custom logger
		LoggerModule.forRootAsync(
			{
				imports: [ConfigModule],
				useFactory: (configService: ConfigService) => {
					return {
						level: configService.get<WinstonLogLevel>('logger.level'),
						consoleLevel: configService.get<WinstonLogLevel>('logger.consoleLevel'),
						timestamp: configService.get<boolean>('logger.timestamp'),
						maxFiles: configService.get<string>('logger.maxFiles'),
						maxFileSize: configService.get<string>('logger.maxFileSize'),
						disableConsoleAtProd: configService.get<boolean>(
							'logger.disableConsoleAtProd'
						),
						dir: configService.get<string>('logger.dir'),
						errorLogName: configService.get<string>('logger.errorLogName'),
						appLogName: configService.get<string>('logger.appLogName')
					};
				},
				inject: [ConfigService]
			},
			// global module
			true
		),
		ApiModule,
		SharedModule,
		AdminModule
	]
})
export class AppModule {}
