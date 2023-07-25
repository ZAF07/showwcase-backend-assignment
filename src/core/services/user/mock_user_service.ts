import { IUserService } from "../../ports/user_service_interface/user_service_interface";
import { RandomUserDetailsDTO } from "../../domain/dtos/user_dto";

export default class MockUserService implements IUserService {
  public async fetchRandomUser(): Promise<RandomUserDetailsDTO | null> {
    try {
      return {
        name: { first: "John Test", last: "Last" },
        gender: "test gender",
      };
    } catch (error) {
      throw new Error("error mock");
    }
  }
}
