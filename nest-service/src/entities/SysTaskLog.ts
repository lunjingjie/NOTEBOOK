import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_task_log", { schema: "nest_db" })
export class SysTaskLog {
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

  @Column("int", { name: "task_id" })
  taskId: number;

  @Column("tinyint", { name: "status", default: () => "'0'" })
  status: number;

  @Column("text", { name: "detail", nullable: true })
  detail: string | null;

  @Column("int", { name: "consume_time", nullable: true, default: () => "'0'" })
  consumeTime: number | null;
}
