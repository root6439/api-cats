import { AppDataSource } from "../typeorm/DataSource";
import { Race } from "../typeorm/entities/Race.entity";
import { Request, Response } from "express";

export class RaceController {
  repo = AppDataSource.getRepository(Race);

  async post(req: Request, res: Response): Promise<Response<Race>> {
    let race = await this.repo.save(req.body);
    return res.status(200).json(race);
  }
}
