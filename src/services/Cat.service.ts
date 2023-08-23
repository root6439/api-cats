import { CatRepository } from "../repositories/Cat.repository";
import { Cat } from "../shared/models/Cat";
import { AppError } from "../shared/models/Error";

export class CatService {
  private catRepo = new CatRepository();

  async getAll(search?: string): Promise<Cat[]> {
    let cats = await this.catRepo.getAll(search);

    if (!cats) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    return cats;
  }

  async getById(id: number): Promise<Cat> {
    let cat = await this.catRepo.getById(id);

    if (!cat) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    return cat;
  }

  async post(body: Cat): Promise<Cat> {
    let cat = await this.catRepo.post(body);
    return cat;
  }

  async put(id: number, body: Cat): Promise<Cat> {
    let catFound = await this.catRepo.getById(id);

    if (catFound) {
      throw new AppError(400, "Objeto já cadastrado!");
    }

    let cat = await this.catRepo.put(id, body);

    return cat;
  }

  async delete(id: number): Promise<void> {
    let catExists = await this.catRepo.getById(id);

    if (!catExists) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    await this.catRepo.delete(id);
  }
}
