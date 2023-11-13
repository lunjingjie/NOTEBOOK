import { Controller, Get, Query } from "@nestjs/common";
import { LoginService } from "./login.service";
import { ImageCaptchaDto } from "./login.dto";
import { ImageCaptcha } from "./login.class";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('登录功能')
@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({
    summary: '获取图片验证码'
  })
  @ApiOkResponse({ type: ImageCaptcha })
  @Get('captcha/img')
  async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    return this.loginService.createImageCaptcha(dto);
  }
}