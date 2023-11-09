import { SysMenu } from "src/entities/SysMenu";

/**
 * 验证码
 */
export class ImageCaptcha {
  img: string;
  id: string;
}

export class LoginToken {
  token: string;
}

export class PermMenuInfo {
  menus: SysMenu[];
  perms: string[];
}