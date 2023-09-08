import { Address } from "../Address";

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public cpf: string,
    public address: Address
  ) {}
}
