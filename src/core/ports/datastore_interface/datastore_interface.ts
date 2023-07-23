import { User } from "../../domain/models/user";

export interface IDatastoreInterface {
  getUser(email: string): Promise<User | null>;
  getProfile(email: string): Promise<User | null>;
  createProfile(user: User): Promise<User | null>;
}
