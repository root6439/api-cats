import { Race } from "./Race";

export class Cat {
  constructor(
    public id: number,
    public name: string,
    public length: number,
    public weight: number,
    public birth: Date,
    public gender: "M" | "F",
    public races: Race[]
  ) {}
}
