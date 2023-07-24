import { User } from "../../domain/models/user";

export interface IAuthService {
  login(user: User): Promise<string | null>;
  register(user: User): Promise<User | null>;
  profile(email: string): Promise<User | null>;
}
