import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address.entity";
import { Role } from "./Roles.entity";

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

  @ManyToOne(() => Address, (address) => address.user, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
