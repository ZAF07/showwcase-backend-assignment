import { User } from "../../../core/domain/models/user";
import { IDatastoreInterface } from "../../../core/ports/datastore_interface/datastore_interface";

class MockDB {
  private static store: Record<string, User> = {
    "test@test.com": {
      email: "test@test.com",
      password: "$2b$10$DM09PzxhLOaXRoJz.Ymyd..RcgKqme5EPVVQA5aA6zTPOxUdwqPHi",
    },
  };

  static set(id: string, user: User): void {
    this.store[id] = { ...user };
  }

  static get(id: string): User | undefined {
    return this.store[id];
  }
}

export default class MockPostgresDBAdapter implements IDatastoreInterface {
  constructor() {}

  public async getUser(email: string): Promise<User | null> {
    try {
      const user = MockDB.get(email);

      if (!user || user == undefined) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getProfile(e: string): Promise<User | null> {
    try {
      const user = MockDB.get(e);
      if (!user || user == undefined) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async createProfile(user: User): Promise<User | null> {
    try {
      const { email, password } = user;
      const newUser: User = { email, password };
      MockDB.set(email, newUser);
      return newUser;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
