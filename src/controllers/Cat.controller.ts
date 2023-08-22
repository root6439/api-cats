import { Request, Response } from "express";
import { CatService } from "../services/Cat.service";
import { Cat } from "../shared/models/Cat";
import { log } from "console";

export class CatController {
  service = new CatService();

  async getAll(req: Request, res: Response): Promise<Response<Cat[]>> {
    try {
      let search: string = req.query.search as string;
      let response = await this.service.getAll(search);
      return res.json(response);
    } catch (err) {
      log(err);
    }
  }

  async getById(req: Request, res: Response): Promise<Response<Cat>> {
    let id = Number(req.params.id);
    let response = await this.service.getById(id);
    return res.json(response);
  }

  async post(req: Request, res: Response): Promise<Response<Cat>> {
    let cat: Cat = await this.service.post(req.body);
    return res.sendStatus(201).json(cat);
  }

  async put(req: Request, res: Response): Promise<Response<Cat>> {
    let id = Number(req.params.id);
    let cat: Cat = await this.service.put(id, req.body);
    return res.sendStatus(200).json(cat);
  }

  async delete(req: Request, res: Response): Promise<Response<boolean>> {
    let id = Number(req.params.id);
    await this.service.delete(id);
    return res.sendStatus(200).json();
  }
}
