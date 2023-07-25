import { RandomUserDetailsDTO } from "../../domain/dtos/user_dto";
import { RandomUser } from "../../domain/models/user";

// Controller/Hanlder needs to have this interface inside of its properties
export interface IUserService {
  fetchRandomUser(): Promise<RandomUserDetailsDTO | null>;
}
