import { User } from "../../domain/models/user";

export interface IAuthService {
  login(email: string, password: string): Promise<string | null>;
  register(email: string, password: string): Promise<User | null>;
  profile(email: string): Promise<User | null>;
}
