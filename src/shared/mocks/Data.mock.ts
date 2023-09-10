import { User } from "../../typeorm/entities/User.entity";
import { Environment } from "../Enums/Environment.enum";
import { AppDataSource } from "../../typeorm/DataSource";

export class DataMock {
  private userRepo = AppDataSource.getRepository(User);

  async createMockUsers(): Promise<void> {
    if (process.env.environment != Environment.DEV) {
      return;
    }

    let newUsers = this.userRepo.create([
      {
        name: "João da Silva",
        email: "joao@example.com",
        password: "senha123",
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
        password: "senha456",
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
        password: "senha789",
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
        password: "senhaABC",
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
        password: "senhaXYZ",
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

    await this.userRepo.save(newUsers);
  }
}
