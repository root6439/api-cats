import { User } from "../shared/models/User";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import { Auth } from "../shared/models/Auth";
import { genId } from "../shared/utils/generateId";
import { AppError } from "../shared/models/Error";

export class LoginService {
  users: User[] = [
    {
      id: 1,
      email: "jae@example.com",
      name: "Jane Smith 1234",
      password: "$2a$08$dsprLpk6ScXLdx09dFBMYeEpSjAYoJvGpnPCmm3Dy7ysqPrt6l4Aa",
    },
  ];

  getAll(search: string = ""): Promise<User[]> {
    return new Promise((resolve, reject) => {
      let response: User[] = this.users.filter((value) => {
        return value.name.toLowerCase().includes(search.toLowerCase());
      });

      resolve(response);
    });
  }

  login(login: string, password: string): Promise<Auth> {
    return new Promise(async (resolve, reject) => {
      let user = this.users.find((value) => value.email == login && value.password == password);

      if (!user) {
        throw new AppError(401, "Login ou senha inválidos");
      }

      const passwordConfirmed = await compare(password, user.password);

      if (!passwordConfirmed) {
        throw new AppError(401, "Login ou senha inválidos");
      }

      const token = sign(user, authConfig.jwt.secret);

      resolve({ user, token });
    });
  }

  register(user: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      let userAlreadyRegistered = this.users.map((value) => value.email).includes(user.email);

      if (userAlreadyRegistered) {
        throw new AppError(500, "Usuário já cadastrado");
      }

      let hashedPassword = await hash(user.password, 8);

      this.users.push({
        id: genId(this.users),
        email: user.email,
        name: user.name,
        password: hashedPassword,
      });

      resolve(this.users.at(-1));
    });
  }
}
