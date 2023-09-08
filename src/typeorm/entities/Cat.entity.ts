import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Race } from "./Race.entity";

@Entity("cats")
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  length: number;

  @Column()
  weight: number;

  @Column()
  birth: Date;

  @Column()
  gender: "M" | "F";

  @OneToMany(() => Race, (race) => race.cat)
  races: Race[];
}
