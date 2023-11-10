import { Controller, Get, Query } from "@nestjs/common";
import { LoginService } from "./login.service";
import { ImageCaptchaDto } from "./login.dto";
import { ImageCaptcha } from "./login.class";

@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get('captcha/img')
  async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    return this.loginService.createImageCaptcha(dto);
  }
}