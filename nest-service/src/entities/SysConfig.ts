import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_2c363c25cf99bcaab3a7f389ba", ["key"], { unique: true })
@Entity("sys_config", { schema: "nest_db" })
export class SysConfig {
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

  @Column("varchar", { name: "key", unique: true, length: 50 })
  key: string;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "value", nullable: true, length: 255 })
  value: string | null;

  @Column("varchar", { name: "remark", nullable: true, length: 255 })
  remark: string | null;
}
