import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./Cat.entity";

@Entity("races")
export class Race {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Cat, (cat) => cat.races, )
  cat: Cat;
}
