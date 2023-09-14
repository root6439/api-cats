import { Request, Response } from "express";
import { CatService } from "../services/Cat.service";
import { Cat } from "../typeorm/entities/Cat.entity";
import { PaginationProperties } from "../shared/interfaces/Pagination";

export class CatController {
  service = new CatService();

  async getAll(req: Request, res: Response): Promise<Response<Cat[]>> {
    let search: string = req.query.search as string;
    let pagParams = new PaginationProperties({ ...req.query });

    let response = await this.service.getAll(search, pagParams);
    return res.json(response);
  }

  async getById(req: Request, res: Response): Promise<Response<Cat>> {
    let id = String(req.params.id);
    let response = await this.service.getById(id);
    return res.json(response);
  }

  async post(req: Request, res: Response): Promise<Response<Cat>> {
    let cat: Cat = await this.service.post(req.body);
    return res.status(201).json(cat);
  }

  async put(req: Request, res: Response): Promise<Response<Cat>> {
    let id = String(req.params.id);
    await this.service.put(id, req.body);
    return res.status(200);
  }

  async delete(req: Request, res: Response): Promise<Response<boolean>> {
    let id = String(req.params.id);
    await this.service.delete(id);
    return res.status(200);
  }

  // async getRaces(req: Request, res: Response): Promise<Response<Race[]>> {
  //   let races = await this.service.getRaces();
  //   return res.status(200).json(races);
  // }
}
