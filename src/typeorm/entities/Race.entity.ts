import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./Cat.entity";

@Entity("race")
export class Race {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Cat, (cat) => cat.races)
  cat: Cat;
}
