import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from '../../login/login.service';
import { ADMIN_PREFIX, ADMIN_USER, AUTHORIZE_KEY_METADATA, PERMISSION_OPTIONAL_KEY_METADATA } from '../../admin.constants';
import { FastifyRequest } from 'fastify';
import { isEmpty } from 'lodash';
import { ApiException } from 'src/exceptions/api.exception';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private jwtService: JwtService,
		private loginService: LoginService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// 是否放开接口鉴权
		const authorize = this.reflector.get<boolean>(AUTHORIZE_KEY_METADATA, context.getHandler());

		if (authorize) {
			return true;
		}

		const request = context.switchToHttp().getRequest<FastifyRequest>();
		const url = request.url;
		const path = url.split('?')[0];
		const token = request.headers['authorization'] as string;
    console.log(token);
		if (isEmpty(token)) {
			throw new ApiException(11001);
		}

		try {
			// 挂在到当前请求上
			request[ADMIN_USER] = this.jwtService.verify(token);
		} catch (e) {
			throw new ApiException(11001);
		}

		if (isEmpty(request[ADMIN_USER])) {
			throw new ApiException(11001);
		}

		const pv = await this.loginService.getRedisPasswordVersionById(request[ADMIN_USER].uid);
		if (pv !== `${request[ADMIN_USER].pv}`) {
      throw new ApiException(11002);
		}

    const redisToken = await this.loginService.getRedisTokenById(request[ADMIN_USER].uid);

    console.log(redisToken);

    if (token !== redisToken) {
      throw new ApiException(11002);
    }

    const notNeedPerm = this.reflector.get<boolean>(
      PERMISSION_OPTIONAL_KEY_METADATA,
      context.getHandler(),
    )

    if (notNeedPerm) {
      return true;
    }

    const perms: string = await this.loginService.getRedisPermsById(
      request[ADMIN_USER].uid,
    );

    // TODO 完成权限配置功能后再打开
    // if (isEmpty(perms)) {
    //   throw new ApiException(11001);
    // }

     // 将sys:admin:user等转换成sys/admin/user
    // const permArray: string[] = (JSON.parse(perms) as string[]).map((e) => {
    //   return e.replace(/:/g, '/');
    // });
    // // 遍历权限是否包含该url，不包含则无访问权限
    // if (!permArray.includes(path.replace(`/${ADMIN_PREFIX}/`, ''))) {
    //   throw new ApiException(11003);
    // }
    // pass
    return true;
	}
}
