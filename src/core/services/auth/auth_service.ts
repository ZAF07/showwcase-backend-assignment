import { connectToPostgres } from "../../../infrastructure/db/postgres/postgres_conn";
import CustomError from "../../../utils/errors/errors";
import { User } from "../../domain/models/user";
import { IAuthService } from "../../ports/auth_service_interface/auth_service_interface";
import { ICacheRepository } from "../../ports/cache_interface/cacheInterface";
import { IDatastoreInterface } from "../../ports/datastore_interface/datastore_interface";
import BcryptHelper from "../../../utils/hashing/bcrypt_hash";
import JWTAuthenticationHelper from "../../../utils/middleware/auth_middleware/auth_middleware";
import { JwtPayload } from "../../../types/types";

export default class AuthService implements IAuthService {
  constructor(
    private db: IDatastoreInterface,
    private cache: ICacheRepository
  ) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
  }

  public async register(email: string, password: string): Promise<User | null> {
    try {
      const hashPwd = await BcryptHelper.hashString(password);
      const newUser = { email, password: hashPwd };
      const res = await this.db.createProfile(newUser);
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async login(email: string, password: string): Promise<string | null> {
    let userEmail;
    let userPwd;

    const res = await this.db.getUser(email);
    userEmail = res?.email;
    userPwd = res?.password;

    if (!res || res == null) {
      throw new CustomError("Auth Service", "User not found", 404);
    }

    if (!userEmail || userEmail == undefined) {
      throw new CustomError(
        "Auth Service",
        "User email not found in database",
        404
      );
    }

    if (!userPwd || userPwd == undefined) {
      throw new CustomError(
        "Auth Service",
        "User password not found in database",
        404
      );
    }

    const matched = await BcryptHelper.compareHash(password, userPwd);
    if (!matched) {
      throw new CustomError(
        "Auth Service",
        "Password does not match the one in record",
        403
      );
    }

    const userPayload: JwtPayload = { email: userEmail, password: userPwd };
    const userToken = JWTAuthenticationHelper.generateToken(userPayload);

    // Add JWT to cache for refresh token (mock)
    this.cache.add("token");

    return userToken;
  }

  public async profile(email: string): Promise<User | null> {
    try {
      const res = await this.db.getProfile(email);
      if (!res || res == null) {
        throw new CustomError("Auth Service", "User not found", 404);
      }
      return res;
    } catch (error) {
      throw new CustomError("Auth service", "something somethig", 500);
    }
  }
}
