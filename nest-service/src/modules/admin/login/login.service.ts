import { Injectable } from '@nestjs/common';
import { ImageCaptcha } from './login.class';
import { ImageCaptchaDto } from './login.dto';
import * as svgCaptcha from 'svg-captcha';
import { isEmpty } from 'lodash';
import { UtilService } from 'src/shared/services/util.service';
import { RedisService } from 'src/shared/services/redis.service';
import { SysUserService } from '../system/user/user.service';
import { ApiException } from 'src/exceptions/api.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
	constructor(
		private util: UtilService,
		private redisService: RedisService,
		private userService: SysUserService,
		private jwtService: JwtService
	) {}

	/**
	 * 创建图片验证码并加入redis缓存
	 * @param captcha 验证码长宽
	 * @returns ImageCaptcha
	 */
	async createImageCaptcha(captcha: ImageCaptchaDto): Promise<ImageCaptcha> {
		// 创建验证码
		const svg = svgCaptcha.create({
			size: 4,
			color: true,
			noise: 4,
			width: isEmpty(captcha.width) ? 100 : captcha.width,
			height: isEmpty(captcha.height) ? 50 : captcha.height,
			charPreset: '0123456789'
		});

		const result = {
			img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
			id: this.util.generateUUID()
		};

		await this.redisService
			.getRedis()
			.set(`admin:captcha:img:${result.id}`, svg.text, 'EX', 60 * 5);
		return result;
	}

	/**
	 * 校验验证码
	 * @param id
	 * @param code 用户输入验证码
	 */
	async checkImageCaptcha(id: string, code: string): Promise<void> {
		const imgText = await this.redisService.getRedis().get(`admin:captcha:img:${id}`);
		if (isEmpty(imgText) || code.toLowerCase() !== imgText.toLowerCase()) {
			throw new ApiException(10002);
		}
		await this.redisService.getRedis().del(`admin:captcha:img:${id}`);
	}

	/**
	 * 获取登录的jwt token
	 * @param username 用户名
	 * @param password 密码
	 * @param ip
	 * @param ua
	 */
	async getLoginSign(
		username: string,
		password: string,
		ip: string,
		ua: string
	): Promise<string> {
		const user = await this.userService.findUserByUserName(username);
		if (isEmpty(user)) {
			throw new ApiException(10003);
		}

    const comparePassword = this.util.md5(`${password}${user.psalt}`);
    if (user.password !== comparePassword) {
      throw new ApiException(10003);
    }
		// TODO 获取权限

		const redis = await this.redisService.getRedis();
		const pv = Number(await redis.get(`admin:passwordVersion:${user.id}`)) || 1;
		const jwtSign = this.jwtService.sign({
			uid: parseInt(user.id.toString()),
			pv
		});

    await redis.set(`admin:passwordVersion:${user.id}`, pv);
    // token设置过期时间24小时
    await redis.set(`admin:token:${user.id}`, jwtSign, 'EX', 60 * 60 * 24);
    // TODO 保存权限信息
    // await redis.set(`admin:perms:${user.id}`, JSON.stringify(perms));
    // TODO 保存登录日志
    // await this.logService.saveLoginLog(user.id, ip, ua);
    return jwtSign;
	}
}
