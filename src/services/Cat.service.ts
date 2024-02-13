import { Pagination } from "./../shared/interfaces/Pagination";
import { DeleteResult, Like, UpdateResult } from "typeorm";
import { AppError } from "../shared/models/Error";
import { AppDataSource } from "../typeorm/DataSource";
import { Cat } from "../typeorm/entities/Cat.entity";
import { PaginationProperties } from "../shared/interfaces/Pagination";

export class CatService {
  private catRepo = AppDataSource.getRepository(Cat);

  async getAll(search: string = "", pProps: PaginationProperties): Promise<Pagination<Cat>> {
    let { page, offset, orderBy, direction } = pProps;

    let [data, total] = await this.catRepo.findAndCount({
      where: { name: Like(`%${search}%`) },
      relations: ["races"],
      take: offset,
      skip: (page - 1) * offset,
      order: {
        [orderBy]: direction,
      },
    });

    return pProps.getData(data, total);
  }

  async getById(id: string): Promise<Cat> {
    let cat = await this.catRepo.findOne({ where: { id }, relations: ["races"] });

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

  async put(id: string, body: Cat): Promise<Cat> {
    let catFound = await this.getById(id);

    if (!catFound) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    let updatedCat = await this.catRepo.save({
      id,
      ...body,
    });

    return updatedCat;
  }

  async delete(id: string): Promise<boolean> {
    let catExists = await this.getById(id);

    if (!catExists) {
      throw new AppError(404, "Objeto não encontrado!");
    }

    await this.catRepo.delete(id);

    return true;
  }

  // async getRaces(): Promise<Race[]> {
  //   let races = await this.catRepo.getRaces();

  //   if (!races) {
  //     throw new AppError(404, "Objeto não encontrado!");
  //   }

  //   return races;
  // }
}
