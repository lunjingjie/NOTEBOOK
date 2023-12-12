import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Index("IDX_223de54d6badbe43a5490450c3", ["name"], { unique: true })
@Index("IDX_f2d07943355da93c3a8a1c411a", ["label"], { unique: true })
@Entity("sys_role", { schema: "nest_db" })
export class SysRole {
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

  @Column("varchar", { name: "user_id", length: 255 })
  userId: string;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "label", unique: true, length: 50 })
  label: string;

  @Column("varchar", { name: "remark", nullable: true, length: 255 })
  remark: string | null;
}
