import { Response } from "express";
import { Request } from "express";
import { UserService } from "../services/User.service";
import { User } from "../typeorm/entities/User.entity";

export class UserController {
  service = new UserService();

  async getAll(req: Request, res: Response): Promise<Response<User[]>> {
    let search = req.query.search as string;
    let users = await this.service.getAll(search);
    return res.json(users);
  }

  async register(req: Request, res: Response): Promise<Response<User>> {
    let user = await this.service.register(req.body);
    return res.status(201).json(user);
  }
}
