import { User } from "../shared/models/user/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import { Auth } from "../shared/models/Auth";
import { AppError } from "../shared/models/Error";
import { UserRepository } from "../repositories/User.repository";

export class LoginService {
  private userRepo = new UserRepository();

  async getAll(search: string = ""): Promise<User[]> {
    return this.userRepo.getAll(search);
  }

  async login(login: string, password: string): Promise<Auth> {
    let user = await this.userRepo.getUserByEmail(login);

    if (!user) {
      throw new AppError(404, "Usuário não encontrado");
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(401, "Senha inválida");
    }

    const token = sign(user, authConfig.jwt.secret);

    return { userResponse: { id: user.id, email: user.email, name: user.name }, token };
  }

  async register(user: User): Promise<User> {
    let userAlreadyRegistered = await this.userRepo.getUserByEmail(user.email);

    console.log(userAlreadyRegistered);

    if (userAlreadyRegistered) {
      throw new AppError(500, "Usuário já cadastrado");
    }

    let newUser = await this.userRepo.postUser(user);

    console.log(newUser);

    return newUser;
  }
}
