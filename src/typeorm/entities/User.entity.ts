import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
