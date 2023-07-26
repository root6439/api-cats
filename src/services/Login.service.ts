import { User } from "../shared/models/User";

export class LoginService {
  login(login: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {});
  }
}
