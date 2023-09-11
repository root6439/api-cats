import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Race } from "./Race.entity";

@Entity("cats")
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("float", { precision: 2 })
  length: number;

  @Column("float", { precision: 2 })
  weight: number;

  @Column()
  birth: Date;

  @Column()
  gender: "M" | "F";

  @OneToMany(() => Race, (race) => race.cat, {
    cascade: true,
  })
  races: Race[];
}
