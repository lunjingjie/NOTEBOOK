// 后端返回给前端的数据
import { ApiProperty } from "@nestjs/swagger";
import { SysMenu } from "src/entities/SysMenu";

/**
 * 验证码
 */
export class ImageCaptcha {
  @ApiProperty({ description: 'base64格式的svg图片' })
  img: string;

  @ApiProperty({ description: '唯一id' })
  id: string;
}

export class LoginToken {
  token: string;
}

export class PermMenuInfo {
  menus: SysMenu[];
  perms: string[];
}