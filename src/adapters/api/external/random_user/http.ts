import { externalService, IHTTPStrategy } from "../../../../types/types";
import {
  RandomUserDetails,
  Convert,
} from "../../../../core/domain/models/user";
import AxiosClient from "../../../../infrastructure/api/axios_client/axios";
import { IFetchRandomUserAPI } from "../../../../core/ports/api_interface/random_user_api_interface/random_user_api_interface";
import { RandomUserDetailsDTO } from "../../../../core/domain/dtos/user_dto";

// 🚨This should be the HTTP client. It only know how to fetch/post via HTTP
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

  public async fetchRandomUser(): Promise<RandomUserDetailsDTO | null> {
    try {
      // 💡 Figuring the type casting/ type assertions of Typescript
      // const response1 = await this.axiosC.axiosInstance.get(
      //   `${this.config.path}?inc=dob`
      // );
      // const randomUser1 = response1.data;
      // console.log("💡==> ", randomUser1);

      // const dob = Convert.toRandomDobDetails(JSON.stringify(randomUser1));
      // console.log("💡💡 ==+> ", dob);

      // ----------------
      const response = await this.axiosC.axiosInstance.get(
        `${this.config.path}`
      );
      const randomUser = response.data;

      const user = Convert.toRandomUserDetails(JSON.stringify(randomUser));
      if (!user) {
        throw new Error("No user found in external api");
      }

      return <RandomUserDetailsDTO>user.results[0];
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
