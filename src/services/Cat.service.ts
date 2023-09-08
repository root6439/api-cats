import { log } from "console";
import { AppError } from "../shared/models/Error";
import { AppDataSource } from "../typeorm/DataSource";
import { Cat } from "../typeorm/entities/Cat.entity";

export class CatService {
  private catRepo = AppDataSource.getRepository(Cat);

  async getAll(search?: string): Promise<Cat[]> {
    let cats = await this.catRepo.find({ where: { name: search } });

    if (!cats) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    return cats;
  }

  async getById(id: number): Promise<Cat> {
    let cat = await this.catRepo.findOne({ where: { id } });

    if (!cat) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    return cat;
  }

  async post(body: Cat): Promise<Cat> {
    let cat = this.catRepo.create({
      birth: new Date(body.birth),
      gender: body.gender,
      length: body.length,
      name: body.name,
      races: body.races,
      weight: body.weight,
    });

    await this.catRepo.insert(cat);
    
    return cat;
  }

  async put(id: number, body: Cat): Promise<void> {
    let catFound = await this.getById(id);

    if (!catFound) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    await this.catRepo.update(id, body);
  }

  async delete(id: number): Promise<void> {
    let catExists = await this.getById(id);

    if (!catExists) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    await this.catRepo.delete(id);
  }

  // async getRaces(): Promise<Race[]> {
  //   let races = await this.catRepo.getRaces();

  //   if (!races) {
  //     throw new AppError(404, "Objeto não encontrado!");
  //   }

  //   return races;
  // }
}
