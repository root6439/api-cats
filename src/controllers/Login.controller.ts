import { NextFunction, Response } from "express";
import { Request } from "express";
import { Auth } from "../shared/models/Auth";
import { LoginService } from "../services/Login.service";
import { User } from "../shared/models/user/User";

export class LoginController {
  service = new LoginService();

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<User[]>> {
    try {
      let search = req.query.search as string;
      let users = await this.service.getAll(search);
      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response<Auth>> {
    let { login, password } = req.body;

    let auth: Auth = await this.service.login(login, password);
    return res.status(200).json(auth);
  }

  async register(req: Request, res: Response): Promise<Response<User>> {
    let user = await this.service.register(req.body);
    return res.status(201).json(user);
  }
}
