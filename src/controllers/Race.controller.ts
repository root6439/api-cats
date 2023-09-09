import { RaceService } from "../services/Race.service";
import { Race } from "../typeorm/entities/Race.entity";
import { Request, Response } from "express";

export class RaceController {
  private service = new RaceService();

  async getAll(req: Request, res: Response): Promise<Response<Race[]>> {
    let races = await this.service.getAll();
    return res.status(200).json(races);
  }

  async post(req: Request, res: Response): Promise<Response<Race>> {
    let race = await this.service.post(req.body);
    return res.status(200).json(race);
  }
}
