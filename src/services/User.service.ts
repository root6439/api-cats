import { Like } from "typeorm";
import { AppError } from "../shared/models/Error";
import { AppDataSource } from "../typeorm/DataSource";
import { Address } from "../typeorm/entities/Address.entity";
import { User } from "../typeorm/entities/User.entity";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);
  private addressRepo = AppDataSource.getRepository(Address);

  async getAll(search: string = ""): Promise<User[]> {
    return this.userRepo.find({ where: { name: Like(`%${search}%`) } });
  }

  async findById(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }

  async register(user: User): Promise<User> {
    let userAlreadyRegistered = await this.userRepo.findOneBy({ email: user.email });

    if (userAlreadyRegistered) {
      throw new AppError(400, "E-mail já está sendo usado por outro usuário");
    }

    let addressAlreadyExists = await this.addressRepo.findOneBy({ cep: user.address.cep });

    if (addressAlreadyExists) {
      user.address.id = addressAlreadyExists.id;
    } else {
      let newAddress = this.addressRepo.create(user.address);
      await this.addressRepo.insert(newAddress);
      user.address.id = newAddress.id;
    }

    let newUser = this.userRepo.create(user);
    await this.userRepo.insert(newUser);

    return newUser;
  }
}
