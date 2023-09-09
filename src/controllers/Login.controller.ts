import { Request, Response } from "express";

import { LoginService } from "../services/Login.service";
import { Auth } from "../shared/models/Auth";

export class LoginController {
  private service = new LoginService();

  async login(req: Request, res: Response): Promise<Response<Auth>> {
    let { login, password } = req.body;

    let auth: Auth = await this.service.login(login, password);
    return res.status(200).json(auth);
  }
}
