import { RandomUserDetailsDTO } from "../../../domain/dtos/user_dto";

export interface IFetchRandomUserAPI {
  fetchRandomUser(): Promise<RandomUserDetailsDTO | null>;
}
