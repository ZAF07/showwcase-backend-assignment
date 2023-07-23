import { RandomUser } from "../../domain/models/user";

// Controller/Hanlder needs to have this interface inside of its properties
export interface IUserService {
  fetchRamdonUser(): Promise<RandomUser | null>;
}
