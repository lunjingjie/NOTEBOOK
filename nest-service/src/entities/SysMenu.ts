import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("sys_menu", { schema: "nest_db" })
export class SysMenu {
  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'parent_id', nullable: true })
  @ApiProperty()
  parentId: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  router: string;

  @Column({ nullable: true })
  @ApiProperty()
  perms: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    comment: '类型: 0=目录 1=菜单 2=权限',
  })
  @ApiProperty()
  type: number;

  @Column({ nullable: true })
  @ApiProperty()
  icon: string;

  @Column({ name: 'order_num', type: 'int', default: 0, nullable: true })
  @ApiProperty()
  orderNum: number;

  @Column({ name: 'view_path', nullable: true })
  @ApiProperty()
  viewPath: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  @ApiProperty()
  keepalive: boolean;

  @Column({ name: 'is_show', type: 'boolean', nullable: true, default: true })
  @ApiProperty()
  isShow: boolean;

  @Column({ name: 'is_ext', type: 'boolean', nullable: true, default: false })
  @ApiProperty()
  isExt: boolean;

  @Column({ name: 'open_mode', type: 'tinyint', nullable: true, default: 1 })
  @ApiProperty()
  openMode: number;
}
