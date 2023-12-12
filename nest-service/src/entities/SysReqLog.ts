import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("sys_req_log", { schema: "nest_db" })
export class SysReqLog {
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

  @Column("varchar", { name: "ip", nullable: true, length: 255 })
  ip: string | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("text", { name: "params", nullable: true })
  params: string | null;

  @Column("varchar", { name: "action", nullable: true, length: 100 })
  action: string | null;

  @Column("varchar", { name: "method", nullable: true, length: 15 })
  method: string | null;

  @Column("int", { name: "status", nullable: true })
  status: number | null;

  @Column("int", { name: "consume_time", nullable: true, default: () => "'0'" })
  consumeTime: number | null;
}
