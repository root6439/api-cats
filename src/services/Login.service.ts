import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Auth } from "../shared/models/Auth";
import { AppError } from "../shared/models/Error";
import authConfig from "../config/auth";
import { UserService } from "./User.service";
import { AppDataSource } from "../typeorm/DataSource";
import { User } from "../typeorm/entities/User.entity";

export class LoginService {
  private userRepo = AppDataSource.getRepository(User);

  async login(email: string, password: string): Promise<Auth> {
    let user = await this.userRepo.findOneBy({ email });

    if (!user) {
      throw new AppError(404, "Usuário não encontrado");
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(401, "Senha inválida");
    }

    const token = sign({ sub: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
      algorithm: "HS256",
    });

    return { token };
  }
}
