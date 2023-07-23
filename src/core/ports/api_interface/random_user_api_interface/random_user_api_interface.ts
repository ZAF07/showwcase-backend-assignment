import { RandomUserDetails, Result } from "../../../domain/dtos/user_dto";

export interface IFetchRandomUserAPI {
  fetchRandomUser(): Promise<Result | null>;
}
