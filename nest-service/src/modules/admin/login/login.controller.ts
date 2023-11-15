import { Body, Controller, Get, Query, Req, Headers, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ImageCaptchaDto, LoginInfoDto } from './login.dto';
import { ImageCaptcha, LoginToken } from './login.class';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { UtilService } from 'src/shared/services/util.service';

@ApiTags('登录功能')
@Controller()
export class LoginController {
	constructor(
		private loginService: LoginService,
		private utils: UtilService
	) {}

	@ApiOperation({
		summary: '获取图片验证码'
	})
	@ApiOkResponse({ type: ImageCaptcha })
	@Get('captcha/img')
	async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
		return this.loginService.createImageCaptcha(dto);
	}

  /**
   * 登录认证
   * @param dto 
   * @param req 
   * @param ua 
   * @returns token
   */
  @ApiOperation({
		summary: '登录认证'
	})
	@ApiOkResponse({ type: LoginToken })
  @Post('login')
	async login(
		@Body() dto: LoginInfoDto,
		@Req() req: FastifyRequest,
		@Headers('user-agent') ua: string
	): Promise<LoginToken> {
    await this.loginService.checkImageCaptcha(dto.captchaId, dto.verifyCode);
		const token = await this.loginService.getLoginSign(
			dto.username,
			dto.password,
			this.utils.getReqIP(req),
			ua,
		);
		return { token };
	}
}
