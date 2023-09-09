import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import { Auth } from "../shared/models/Auth";
import { AppError } from "../shared/models/Error";
import { AppDataSource } from "../typeorm/DataSource";
import { User } from "../typeorm/entities/User.entity";

export class LoginService {
  private userRepo = AppDataSource.getRepository(User);

  async getAll(search: string = ""): Promise<User[]> {
    return this.userRepo.find({ where: { name: search } });
  }

  async login(email: string, password: string): Promise<Auth> {
    let user = await this.userRepo.findOne({ where: { email } });

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

  async register(user: User): Promise<User> {
    let userAlreadyRegistered = await this.userRepo.findOne({ where: { email: user.email } });

    if (userAlreadyRegistered) {
      throw new AppError(400, "Usuário já cadastrado");
    }

    let newUser = this.userRepo.create(user);

    await this.userRepo.insert(newUser);

    return newUser;
  }
}
