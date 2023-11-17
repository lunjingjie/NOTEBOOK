import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Index("IDX_ef8e5ab5ef2fe0ddb1428439ef", ["name"], { unique: true })
@Entity("sys_task", { schema: "nest_db" })
export class SysTask {
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

  @Column("varchar", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("varchar", { name: "service", length: 255 })
  service: string;

  @Column("tinyint", { name: "type", default: () => "'0'" })
  type: number;

  @Column("tinyint", { name: "status", default: () => "'1'" })
  status: number;

  @Column("datetime", { name: "start_time", nullable: true })
  startTime: Date | null;

  @Column("datetime", { name: "end_time", nullable: true })
  endTime: Date | null;

  @Column("int", { name: "limit", nullable: true, default: () => "'0'" })
  limit: number | null;

  @Column("varchar", { name: "cron", nullable: true, length: 255 })
  cron: string | null;

  @Column("int", { name: "every", nullable: true })
  every: number | null;

  @Column("text", { name: "data", nullable: true })
  data: string | null;

  @Column("text", { name: "job_opts", nullable: true })
  jobOpts: string | null;

  @Column("varchar", { name: "remark", nullable: true, length: 255 })
  remark: string | null;
}
