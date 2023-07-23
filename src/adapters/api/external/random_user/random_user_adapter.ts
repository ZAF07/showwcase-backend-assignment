import { IFetchRandomUserAPI } from "../../../../core/ports/api_interface/random_user_api_interface/random_user_api_interface";
import { Result } from "../../../../core/domain/dtos/user_dto";
import { externalService } from "../../../../types/types";
import { app } from "../../../../utils/constants/constants";
import APIClient from "./http";

// This module interacts with third-party APIs. Could also be an internal service we need to make calls to
// Could implement a Circuit Breaker or a Retry pattern here since this endpoint intermittently give failures ..
// 💡 We could also initialise this adapter to have all paths of the external services as properties.
export default class UserAPI implements IFetchRandomUserAPI {
  private apiClient: IFetchRandomUserAPI;
  constructor(private config: externalService) {
    this.fetchRandomUser = this.fetchRandomUser.bind(this);
    this.setAPIClient();
  }

  // 💡 TODO: Find way to change configs during runtime
  private setAPIClient() {
    switch (this.config.clientType) {
      case app.HTTP:
        this.apiClient = new APIClient(this.config);
        break;
      // Could be a RPC client, Webhook etc ...

      default:
        break;
    }
  }

  public async fetchRandomUser(): Promise<Result | null> {
    try {
      const response = await this.apiClient.fetchRandomUser();
      if (response == null) {
        return null;
      }
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
