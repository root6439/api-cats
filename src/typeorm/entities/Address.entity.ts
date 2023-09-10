import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  cep: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @OneToMany(() => User, (user) => user.address)
  user: User[];
}
