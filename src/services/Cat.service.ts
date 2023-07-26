import { Cat } from "../shared/models/Cat";

export class CatService {
  cats: Cat[] = [
    { id: 1, name: "Cesar", length: 0.3, weight: 4.0, race: "Ciamês" },
    { id: 2, name: "Augusto", length: 0.5, weight: 4.0, race: "Persa" },
    { id: 3, name: "Ronaldo", length: 0.1, weight: 4.0, race: "Burmês" },
    { id: 4, name: "Gato", length: 0.2, weight: 4.0, race: "Bengal" },
    { id: 5, name: "Farofa", length: 0.8, weight: 4.0, race: "Abissínio" },
  ];

  getAll(search?: string): Promise<Cat[]> {
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
        id: this.genId(),
        ...body,
      };

      this.cats.push(body);
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
      this.cats.splice(index);
      resolve();
    });
  }

  genId(): number {
    return this.cats.length > 0 ? Math.max(...this.cats.map((cats) => cats.id)) + 1 : 11;
  }
}
