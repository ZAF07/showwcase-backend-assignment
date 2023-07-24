import { RandomUser } from "../../domain/models/user";
import { IUserService } from "../../ports/user_service_interface/user_service_interface";
import { ICacheRepository } from "../../ports/cache_interface/cacheInterface";
import { IFetchRandomUserAPI } from "../../ports/api_interface/random_user_api_interface/random_user_api_interface";
import CustomError from "../../../utils/errors/errors";

// This is the core logic for the user service. It depends on DB and cache to work. It should accept an initialised client for both dependencies
export class UserService implements IUserService {
  constructor(
    private cacheRepo: ICacheRepository,
    private randomAPIAdapter: IFetchRandomUserAPI
  ) {
    this.fetchRamdonUser = this.fetchRamdonUser.bind(this);
  }

  // Fetches a random user from an external API
  public async fetchRamdonUser(): Promise<RandomUser | null> {
    try {
      const randomUser = await this.randomAPIAdapter.fetchRandomUser();

      if (!randomUser || randomUser == null) {
        // Could throw here, depending on business rules
        return null;
      }

      // Ensure type safety for firstName and age properties
      const user: RandomUser = {
        firstName: randomUser?.name.first || "Unknown",
        age: randomUser?.dob.age || 0,
      };
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError("User Service", error.message, error.statusCode);
      }
      throw new Error(String(error));
    }
  }
}
