import { RandomUser } from "../../domain/models/user";

export interface ICacheRepository {
  findByUsername(id: string): Promise<RandomUser | null>;
  add(token: string): boolean;
  // Add other methods for user CRUD operations as needed.
  // For example: createUser, updateUser, deleteUser, etc.
}
