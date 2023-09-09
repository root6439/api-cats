import { AppDataSource } from "../typeorm/DataSource";
import { Race } from "../typeorm/entities/Race.entity";

export class RaceService {
  private raceRepo = AppDataSource.getRepository(Race);

  async getAll(): Promise<Race[]> {
    return this.raceRepo.find();
  }

  async post(race: Race): Promise<Race> {
    let newRace = this.raceRepo.create(race);
    await this.raceRepo.insert(newRace);
    return newRace;
  }
}
