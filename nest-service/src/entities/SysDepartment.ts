import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("sys_department", { schema: "nest_db" })
export class SysDepartment {
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

  @Column("int", { name: "parent_id", nullable: true })
  parentId: number | null;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "order_num", nullable: true, default: () => "'0'" })
  orderNum: number | null;
}
