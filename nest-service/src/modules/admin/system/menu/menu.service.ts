import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysMenu } from 'src/entities/SysMenu';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './menu.dto';

@Injectable()
export class SysMenuService {
  constructor(
    @InjectRepository(SysMenu) private menuRepository: Repository<SysMenu>,
  ) {}

  async list(): Promise<SysMenu[]> {
    return await this.menuRepository.find();
  }

  async save(menu: CreateMenuDto & { id?: number }): Promise<void> {
    await this.menuRepository.save(menu);
    // TODO 刷新在线用户权限
  }

  getMenus() {}

  check() {}

  findChildMenus() {}

  getMenuItemInfo() {}

  getMenuItemAndParentInfo() {}

  findRouterExist() {}

  getPerms() {}

  deleteMenuItem() {}

  refreshPerms() {}

  refreshOnlineUserPerms() {}
}
