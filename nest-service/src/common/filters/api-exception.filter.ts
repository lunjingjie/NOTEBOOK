import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { LoggerService } from 'src/shared/logger/logger.service';
import { ResponseDto } from '../class/res.class';
import { ApiException } from 'src/exceptions/api.exception';

/**
 * 统一异常处理、返回数据
 */
@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
	constructor(private logger: LoggerService) {}

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<FastifyReply>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;
    
    response.header('Content-Type', 'application/json; charset=utf-8');
    const code = exception instanceof ApiException ? (exception as ApiException).getErrorCode() : status;
    let message = '服务器异常，请稍后再试';
    message = exception instanceof HttpException ? exception.message : `${exception}`;
    if (status >= 500) {
      this.logger.error(exception, ApiExceptionFilter.name)
    }
    const result = new ResponseDto(code, null, message);
    response.status(status).send(result);
	}
}
