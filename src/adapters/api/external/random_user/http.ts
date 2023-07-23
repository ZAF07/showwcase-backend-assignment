import { externalService, IHTTPStrategy } from "../../../../types/types";
import { Result, Convert } from "../../../../core/domain/dtos/user_dto";
import AxiosClient from "../../../../infrastructure/api/axios_client/axios";
import { IFetchRandomUserAPI } from "../../../../core/ports/api_interface/random_user_api_interface/random_user_api_interface";

// 💡TODO: THIS CLASS AND THE random_user_adapter.ts can be joined.
// random_user_adapter.ts can do the switching of the client and make the calls itself
// THIS CLASS SHOULD ONLY RETURN THE API CLIENT. RPC OR HTTP
// 🚨This should be the HTTP client. It only know how to speak HTTP
export default class APIClient implements IFetchRandomUserAPI {
  private strategy: IHTTPStrategy;
  private config: externalService;
  private axiosC: AxiosClient;
  constructor(appConfig: externalService) {
    this.config = appConfig;
    this.initAxiosClient();
  }

  private initAxiosClient() {
    this.axiosC = new AxiosClient(
      this.config.baseURL,
      this.config.path,
      this.config.headers.accept,
      this.config.timeout
    );
  }

  public async fetchRandomUser(): Promise<Result | null> {
    try {
      const response = await this.axiosC.axiosInstance.get(this.config.path);
      const randomUser = response.data;
      const user = Convert.toRandomUserDetails(JSON.stringify(randomUser));
      if (!user) {
        throw new Error("No user found in external api");
      }
      return user.results[0];
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
