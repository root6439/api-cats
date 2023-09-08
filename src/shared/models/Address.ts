export class Address {
  constructor(
    public cep: string,
    public street: string,
    public number: number,
    public city: string,
    public neighborhood: string,
    public state: string
  ) {}
}
