import { Response } from "express";
import { Request } from "express";
import { Auth } from "../shared/models/Auth";
import { LoginService } from "../services/Login.service";
import { User } from "../shared/models/User";

export class LoginController {
  service = new LoginService();

  async getAll(req: Request, res: Response): Promise<Response<User[]>> {
    let search = req.query.search as string;
    let users = await this.service.getAll(search);
    return res.json(users);
  }

  async login(req: Request, res: Response): Promise<Response<Auth>> {
    let login = req.body.login;
    let password = req.body.password;

    let auth: Auth = await this.service.login(login, password);
    return res.status(200).json(auth);
  }

  async register(req: Request, res: Response): Promise<Response<User>> {
    let user = await this.service.register(req.body);
    return res.status(201).json(user);
  }
}
