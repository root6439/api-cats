import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  cep: string;

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
}
