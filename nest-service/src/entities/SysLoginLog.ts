import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("sys_login_log", { schema: "nest_db" })
export class SysLoginLog {
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

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "ip", nullable: true, length: 255 })
  ip: string | null;

  @Column("datetime", { name: "time", nullable: true })
  time: Date | null;

  @Column("varchar", { name: "ua", nullable: true, length: 500 })
  ua: string | null;

  @Column("varchar", {
    name: "login_location",
    comment: "登录地点",
    length: 255,
  })
  loginLocation: string;
}
