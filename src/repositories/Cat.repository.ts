import { Cat } from "../shared/models/Cat.model";
import { Race } from "../shared/models/Race";
import { genId } from "../shared/utils/generateId";
import { removeEspecialChars } from "../shared/utils/removeEspecialChars";

export class CatRepository {
  races: Race[] = [
    new Race(1, "Siamese"),
    new Race(2, "Persian"),
    new Race(3, "Tabby"),
    new Race(4, "Maine Coon"),
    new Race(5, "Sphynx"),
  ];

  cats: Cat[] = [
    new Cat(1, "Whiskers", 40, 5, new Date(2018, 5, 15), "M", [this.races[0], this.races[1]]),
    new Cat(2, "Fluffy", 35, 4, new Date(2020, 2, 10), "F", [this.races[1], this.races[3]]),
    new Cat(3, "Mittens", 38, 6, new Date(2019, 8, 22), "F", [this.races[2]]),
    new Cat(4, "Leo", 45, 7, new Date(2017, 11, 5), "M", [this.races[3]]),
    new Cat(5, "Bella", 30, 3, new Date(2022, 6, 30), "F", [this.races[4]]),
    new Cat(6, "Sansão", 30, 3, new Date(2022, 6, 30), "F", [this.races[4]]),
  ];

  async getAll(search: string = ""): Promise<Cat[]> {
    return new Promise((resolve, reject) => {
      let response: Cat[] = this.cats;

      if (search) {
        response = this.cats.filter((value) => {
          return removeEspecialChars(value.name).toLowerCase().includes(removeEspecialChars(search).toLowerCase());
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
