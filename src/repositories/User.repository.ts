import { hash } from "bcryptjs";
import { User } from "../shared/models/user/User";
import { genId } from "../shared/utils/generateId";
import { Address } from "../shared/models/Address";
import axios from "axios";
import { AppError } from "../shared/models/Error";

export class UserRepository {
  users: User[] = [
    {
      id: 1,
      email: "jae@gmail.com",
      name: "Jane Smith 1234",
      password: "$2a$08$dsprLpk6ScXLdx09dFBMYeEpSjAYoJvGpnPCmm3Dy7ysqPrt6l4Aa",
      cpf: "12345678956",
      address: new Address("11111-111", "Rua A", 101, "Cidade X", "Bairro Y", "SC"),
    },
    {
      id: 2,
      email: "nicolas@gmail.com",
      name: "Nicolas Soares Henrique",
      password: "$2a$08$20RwYoEoECNFYv/IDham1eJMdV5kWINdtAf7UN/uyqK/ikGSBR6EK",
      cpf: "78945612354",
      address: new Address("22222-222", "Rua B", 202, "Cidade Y", "Bairro Z", "SC"),
    },
    {
      id: 3,
      email: "caroline@gmail.com",
      name: "Caroline Soares Henrique",
      password: "$2a$08$SD7kjAcmoCXTgQSWwN.BIeyivrsFZkWlOviKNGyepXlhFytBXNHQm",
      cpf: "45678912345",
      address: new Address("33333-333", "Rua C", 303, "Cidade Z", "Bairro X", "SC"),
    },
  ];

  getUserByEmail(login: string): Promise<User> {
    return new Promise((resolve) => {
      let user = this.users.find((value) => value.email == login);
      resolve(user);
    });
  }

  getAll(search: string = ""): Promise<User[]> {
    return new Promise((resolve) => {
      let response = this.users;

      if (search != "") {
        search = search.toLowerCase();
        let response = this.users.filter((value) => value.email.toLowerCase().includes(search));
        response = response.concat(this.users.filter((value) => value.name.toLowerCase().includes(search)));
      }

      resolve(response);
    });
  }

  postUser(user: User): Promise<User> {
    return new Promise(async (resolve) => {
      let address: Address;
      try {
        address = (await axios.get(`https://brasilapi.com.br/api/cep/v1/${user.address.cep}`)).data;
      } catch (e) {
        throw new AppError(404, "CEP informado não existe.");
      }

      let hashedPassword = await hash(user.password, 8);

      this.users.push({
        id: genId(this.users),
        email: user.email,
        name: user.name,
        password: hashedPassword,
        cpf: user.cpf,
        address: address,
      });

      resolve(this.users.at(-1));
    });
  }
}
