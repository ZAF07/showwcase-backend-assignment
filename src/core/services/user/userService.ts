import { RandomUserDetailsDTO } from "../../domain/dtos/user_dto";
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
    this.fetchRandomUser = this.fetchRandomUser.bind(this);
  }

  // Fetches a random user from an external API
  public async fetchRandomUser(): Promise<RandomUserDetailsDTO | null> {
    try {
      const randomUser = await this.randomAPIAdapter.fetchRandomUser();

      if (!randomUser || randomUser == null) {
        // Could throw here, depending on business rules
        return null;
      }

      // filter sensitive data from the response since this is not a protected route
      const f: RandomUserDetailsDTO = {
        ...randomUser,
        login: {
          username: randomUser.login?.username,
          uuid: randomUser.login?.uuid,
        },
      };

      return f;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError("User Service", error.message, error.statusCode);
      }
      throw new Error(String(error));
    }
  }
}
