import { hash } from "bcryptjs";
import { User } from "../shared/models/user/User";
import { genId } from "../shared/utils/generateId";

export class UserRepository {
  users: User[] = [
    {
      id: 1,
      email: "jae@gmail.com",
      name: "Jane Smith 1234",
      password: "$2a$08$dsprLpk6ScXLdx09dFBMYeEpSjAYoJvGpnPCmm3Dy7ysqPrt6l4Aa",
    },
    {
      id: 2,
      email: "nicolas@gmail.com",
      name: "Nicolas Soares Henrique",
      password: "$2a$08$20RwYoEoECNFYv/IDham1eJMdV5kWINdtAf7UN/uyqK/ikGSBR6EK",
    },
    {
      id: 3,
      email: "caroline@gmail.com",
      name: "Caroline Soares Henrique",
      password: "$2a$08$SD7kjAcmoCXTgQSWwN.BIeyivrsFZkWlOviKNGyepXlhFytBXNHQm",
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
