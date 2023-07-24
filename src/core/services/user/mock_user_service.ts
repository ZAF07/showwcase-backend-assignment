import { IUserService } from "../../ports/user_service_interface/user_service_interface";
import { RandomUser } from "../../domain/models/user";

export default class MockUserService implements IUserService {
  public async fetchRamdonUser(): Promise<RandomUser | null> {
    try {
      return { firstName: "MOCK USER", age: 1000 };
    } catch (error) {
      throw new Error("error mock");
    }
  }
}
