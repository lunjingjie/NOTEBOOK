import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_menu", { schema: "nest_db" })
export class SysMenu {
  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "parent_id", nullable: true })
  parentId: number | null;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "router", nullable: true, length: 255 })
  router: string | null;

  @Column("varchar", { name: "perms", nullable: true, length: 255 })
  perms: string | null;

  @Column("tinyint", {
    name: "type",
    comment: "类型: 0=目录 1=菜单 2=权限",
    width: 1,
    default: () => "'0'",
  })
  type: boolean;

  @Column("varchar", { name: "icon", nullable: true, length: 255 })
  icon: string | null;

  @Column("int", { name: "order_num", nullable: true, default: () => "'0'" })
  orderNum: number | null;

  @Column("varchar", { name: "view_path", nullable: true, length: 255 })
  viewPath: string | null;

  @Column("tinyint", {
    name: "keepalive",
    nullable: true,
    default: () => "'1'",
  })
  keepalive: number | null;

  @Column("tinyint", { name: "is_show", nullable: true, default: () => "'1'" })
  isShow: number | null;

  @Column("tinyint", { name: "is_ext", nullable: true, default: () => "'0'" })
  isExt: number | null;

  @Column("tinyint", {
    name: "open_mode",
    nullable: true,
    default: () => "'1'",
  })
  openMode: number | null;
}
