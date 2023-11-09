import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Index("IDX_9e7164b2f1ea1348bc0eb0a7da", ["username"], { unique: true })
@Entity("sys_user", { schema: "nest_db" })
export class SysUser {
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

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "department_id" })
  departmentId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "nick_name", nullable: true, length: 255 })
  nickName: string | null;

  @Column("varchar", { name: "head_img", nullable: true, length: 255 })
  headImg: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "remark", nullable: true, length: 255 })
  remark: string | null;

  @Column("varchar", { name: "psalt", length: 32 })
  psalt: string;

  @Column("tinyint", { name: "status", nullable: true, default: () => "'1'" })
  status: number | null;
}
