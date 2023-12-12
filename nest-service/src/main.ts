import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { setupSwagger } from './setup-swagger';
import { Logger } from '@nestjs/common';
import { LoggerService } from './shared/logger/logger.service';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
		bufferLogs: true
	});
  app.enableCors();
  // custom logger
  app.useLogger(app.get(LoggerService));
  app.useGlobalFilters(new ApiExceptionFilter(app.get(LoggerService)));
  // swagger
  setupSwagger(app);
	await app.listen(3000);
  const serverUrl = await app.getUrl();
  Logger.log(`api服务已经启动,请访问: ${serverUrl}`);
  Logger.log(`API文档已生成,请访问: ${serverUrl}/${process.env.SWAGGER_PATH}/`);
}
bootstrap();
