import { Cat } from "../shared/models/Cat";
import { Race } from "../shared/models/Race";
import { genId } from "../shared/utils/generateId";

export class CatRepository {
  races: Race[] = [
    { id: 1, name: "Siamês" },
    { id: 2, name: "Persa" },
    { id: 3, name: "Burmês" },
    { id: 4, name: "Bengal" },
    { id: 5, name: "Abissínio" },
    { id: 6, name: "Maine Coon" },
    { id: 7, name: "Sphynx" },
    { id: 8, name: "Vira-lata" },
  ];

  cats: Cat[] = [
    { id: 1, name: "Cesar", length: 0.3, weight: 4.1, race: [this.races[0], this.races[1]] },
    { id: 2, name: "Augusto", length: 0.5, weight: 4.2, race: [{ id: 2, name: "Persa" }] },
    { id: 3, name: "Ronaldo", length: 0.1, weight: 4.3, race: [{ id: 3, name: "Burmês" }] },
    { id: 4, name: "Gato", length: 0.2, weight: 4.0, race: [{ id: 4, name: "Bengal" }] },
    { id: 5, name: "Farofa", length: 0.8, weight: 4.0, race: [{ id: 5, name: "Abissínio" }] },
  ];

  async getAll(search: string = ""): Promise<Cat[]> {
    return new Promise((resolve, reject) => {
      let response: Cat[] = this.cats;

      if (search) {
        response = this.cats.filter((value) => {
          return value.name.toLowerCase().includes(search.toLowerCase());
        });
      }

      resolve(response);
    });
  }

  getById(id: number): Promise<Cat> {
    return new Promise((resolve, reject) => {
      let cat = this.cats.find((value) => value.id == id);
      resolve(cat);
    });
  }

  post(body: Cat): Promise<Cat> {
    return new Promise((resolve, reject) => {
      let cat: Cat = {
        id: genId(this.cats),
        ...body,
      };

      this.cats.push(cat);
      resolve(cat);
    });
  }

  put(id: number, body: Cat): Promise<Cat> {
    return new Promise((resolve, reject) => {
      let index = this.cats.findIndex((value) => value.id == id);

      this.cats[index] = {
        id,
        ...body,
      };
      resolve(this.cats[index]);
    });
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = this.cats.findIndex((value) => value.id == id);
      this.cats.splice(index, 1);
      resolve();
    });
  }

  getRaces(): Promise<Race[]> {
    return new Promise((resolve) => {
      resolve(this.races);
    });
  }
}
