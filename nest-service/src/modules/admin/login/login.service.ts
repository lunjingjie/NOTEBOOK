import { Injectable } from '@nestjs/common';
import { ImageCaptcha } from './login.class';
import { ImageCaptchaDto } from './login.dto';
import * as svgCaptcha from 'svg-captcha';
import { isEmpty } from 'lodash';
import { UtilService } from 'src/shared/services/util.service';
import { RedisService } from 'src/shared/services/redis.service';

@Injectable()
export class LoginService {
  constructor(
    private util: UtilService,
    private redisService: RedisService
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
      charPreset: '0123456789',
    });

    const result = {
      img:  `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        'base64',
      )}`,
      id: this.util.generateUUID(),
    };

    await this.redisService.getRedis().set(`admin:captcha:img:${result.id}`, svg.text, 'EX', 60 * 5);
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
      throw new Error('验证码错误');
    }
    await this.redisService.getRedis().del(`admin:captcha:img:${id}`);
  }
}
