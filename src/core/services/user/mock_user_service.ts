// __mocks__/user_service.ts
import { IUserService } from "../../ports/user_service_interface/user_service_interface";
import { RandomUser, User } from "../../domain/models/user";

export default class MockUserService implements IUserService {
  public async fetchRamdonUser(): Promise<RandomUser | null> {
    //   return { : 2, name: "Jane Smith" };o
    try {
      return { firstName: "MOCK USER", age: 1000 };
    } catch (error) {
      throw new Error("error mock");
    }
  }
}
