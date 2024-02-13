import { User } from "../../typeorm/entities/User.entity";
import { AppDataSource } from "../../typeorm/DataSource";
import { hash } from "bcryptjs";
import { Cat } from "../../typeorm/entities/Cat.entity";
import { Race } from "../../typeorm/entities/Race.entity";
import { Role } from "../../typeorm/entities/Roles.entity";

export class DataMock {
  static async createDataMocks(): Promise<void> {
    await this.createMockCats();
    await this.createMockUsers();
    await this.createMockRoles();
  }

  static async createMockUsers(): Promise<void> {
    let userRepo = AppDataSource.getRepository(User);

    let password = await hash("123", 8);

    let newUsers = userRepo.create([
      {
        name: "João da Silva",
        email: "joao@example.com",
        password,
        cpf: "123.456.789-00",
        address: {
          cep: 12345678,
          street: "Rua das Flores",
          number: 123,
          city: "São Paulo",
          neighborhood: "Jardim Botânico",
          state: "SP",
        },
      },
      {
        name: "Maria Santos",
        email: "maria@example.com",
        password,
        cpf: "987.654.321-00",
        address: {
          cep: 54321987,
          street: "Avenida Central",
          number: 456,
          city: "Rio de Janeiro",
          neighborhood: "Copacabana",
          state: "RJ",
        },
      },
      {
        name: "Carlos Ferreira",
        email: "carlos@example.com",
        password,
        cpf: "111.222.333-44",
        address: {
          cep: 98765432,
          street: "Rua das Palmeiras",
          number: 789,
          city: "Belo Horizonte",
          neighborhood: "Savassi",
          state: "MG",
        },
      },
      {
        name: "Ana Oliveira",
        email: "ana@example.com",
        password,
        cpf: "555.666.777-88",
        address: {
          cep: 13579246,
          street: "Rua das Estrelas",
          number: 101,
          city: "Brasília",
          neighborhood: "Asa Norte",
          state: "DF",
        },
      },
      {
        name: "Mariana Lima",
        email: "mariana@example.com",
        password,
        cpf: "999.888.777-66",
        address: {
          cep: 76543210,
          street: "Avenida Principal",
          number: 234,
          city: "Recife",
          neighborhood: "Boa Viagem",
          state: "PE",
        },
      },
    ]);

    await userRepo.save(newUsers);
  }

  static async createMockRoles(): Promise<void> {
    let roleRepo = AppDataSource.getRepository(Role);

    let roles = roleRepo.create([{ name: "admin" }, { name: "public" }]);

    await roleRepo.save(roles);
  }

  static async createMockCats(): Promise<void> {
    let catRepo = AppDataSource.getRepository(Cat);
    let raceRepo = AppDataSource.getRepository(Race);

    let races = raceRepo.create([
      {
        name: "Bengal",
      },
      {
        name: "Siamese",
      },
      {
        name: "Maine Coon",
      },
      {
        name: "Persian",
      },
      {
        name: "Scottish Fold",
      },
      {
        name: "Siberian",
      },
      {
        name: "British Shorthair",
      },
      {
        name: "American Shorthair",
      },
      {
        name: "Ragamuffin",
      },
      {
        name: "Vira-lata",
      },
    ]);

    let newRaces = await raceRepo.save(races);

    let newCats = catRepo.create([
      {
        name: "Fluffy",
        length: 55.1,
        weight: 5.5,
        birth: "2023-09-11T12:00:00.000Z",
        gender: "M",
        races: [newRaces[0]],
      },
      {
        name: "Whiskers",
        length: 42.5,
        weight: 4.2,
        birth: "2022-11-05T08:30:00.000Z",
        gender: "F",
        races: [newRaces[1]],
      },
      {
        name: "Max",
        length: 48.7,
        weight: 6.0,
        birth: "2020-05-20T14:15:00.000Z",
        gender: "M",
        races: [newRaces[2]],
      },
      {
        name: "Luna",
        length: 37.2,
        weight: 3.8,
        birth: "2019-08-14T17:45:00.000Z",
        gender: "F",
        races: [newRaces[3]],
      },
      {
        name: "Simba",
        length: 60.3,
        weight: 7.2,
        birth: "2021-03-30T10:20:00.000Z",
        gender: "M",
        races: [newRaces[4]],
      },
      {
        name: "Bella",
        length: 38.6,
        weight: 4.0,
        birth: "2020-12-03T11:55:00.000Z",
        gender: "F",
        races: [newRaces[5]],
      },
      {
        name: "Leo",
        length: 47.8,
        weight: 6.2,
        birth: "2021-04-18T14:40:00.000Z",
        gender: "M",
        races: [newRaces[6]],
      },
      {
        name: "Sophie",
        length: 36.4,
        weight: 3.6,
        birth: "2019-11-29T16:50:00.000Z",
        gender: "F",
        races: [newRaces[7]],
      },
      {
        name: "Tiger",
        length: 44.5,
        weight: 5.4,
        birth: "2022-02-15T09:30:00.000Z",
        gender: "M",
        races: [newRaces[8]],
      },
      {
        name: "Adolgo",
        length: 32.5,
        weight: 6.8,
        birth: "2022-02-15T09:30:00.000Z",
        gender: "M",
        races: [newRaces[9]],
      },
    ]);

    await catRepo.save(newCats);
  }
}
