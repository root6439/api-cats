import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./Cat.entity";

@Entity("races")
export class Race {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Cat, (cat) => cat.races, { onDelete: "CASCADE" })
  cat: Cat;
}
