import { AppError } from "../shared/models/Error";
import { AppDataSource } from "../typeorm/DataSource";
import { User } from "../typeorm/entities/User.entity";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async getAll(search: string = ""): Promise<User[]> {
    return this.userRepo.find({ where: { name: search } });
  }

  async findById(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }

  async register(user: User): Promise<User> {
    let userAlreadyRegistered = await this.userRepo.findOneBy({ email: user.email });

    if (userAlreadyRegistered) {
      throw new AppError(400, "E-mail já está sendo usado por outro usuário");
    }

    let newUser = this.userRepo.create(user);

    await this.userRepo.insert(newUser);

    return newUser;
  }
}
