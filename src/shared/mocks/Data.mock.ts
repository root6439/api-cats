import { User } from "../../typeorm/entities/User.entity";
import { AppDataSource } from "../../typeorm/DataSource";
import { Address } from "../../typeorm/entities/Address.entity";
import { hash } from "bcryptjs";
import { Cat } from "../../typeorm/entities/Cat.entity";
import { Race } from "../../typeorm/entities/Race.entity";

export class DataMock {
  static async createDataMocks(): Promise<void> {
    await this.createMockCats();
    await this.createMockUsers();
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

  static async createMockCats(): Promise<void> {
    let catRepo = AppDataSource.getRepository(Cat);
    let raceRepo = AppDataSource.getRepository(Race);

    let races = raceRepo.create([
      {
        name: "Siamese",
      },
      {
        name: "Persian",
      },
      {
        name: "Maine Coon",
      },
      {
        name: "Scottish Fold",
      },
      {
        name: "Bengal",
      },
    ]);

    let newRaces = await raceRepo.save(races);

    let newCats = catRepo.create([
      {
        name: "Whiskers",
        length: 35.5,
        weight: 4.2,
        birth: "2023-09-11T12:00:00.000Z",
        gender: "M",
        races: [newRaces[0], newRaces[1]],
      },
      {
        name: "Mittens",
        length: 42.3,
        weight: 3.8,
        birth: "2023-09-11T12:00:00.000Z",
        gender: "F",
        races: [newRaces[3]],
      },
      {
        name: "Fluffy",
        length: 55.1,
        weight: 5.5,
        birth: "2023-09-11T12:00:00.000Z",
        gender: "M",
        races: [newRaces[4]],
      },
      {
        name: "Socks",
        length: 48.7,
        weight: 4.9,
        birth: "2023-09-11T12:00:00.000Z",
        gender: "F",
        races: [newRaces[1]],
      },
      {
        name: "Tiger",
        length: 37.2,
        weight: 6.2,
        birth: "2023-09-11T12:00:00.000Z",
        gender: "M",
        races: [newRaces[0]],
      },
    ]);

    await catRepo.save(newCats);
  }
}
