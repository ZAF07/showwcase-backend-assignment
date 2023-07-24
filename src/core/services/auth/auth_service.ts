import CustomError from "../../../utils/errors/errors";
import { User } from "../../domain/models/user";
import { IAuthService } from "../../ports/auth_service_interface/auth_service_interface";
import { ICacheRepository } from "../../ports/cache_interface/cacheInterface";
import { IDatastoreInterface } from "../../ports/datastore_interface/datastore_interface";
import BcryptHelper from "../../../utils/hashing/bcrypt_hash";
import JWTAuthenticationHelper from "../../../utils/middleware/auth_middleware/auth_middleware";
import { JwtPayload } from "../../../types/types";

// This class represents the core business logic of the application. It sits in the core of the application and exposes interfaces for adapters to implement in order to use this service
export default class AuthService implements IAuthService {
  constructor(
    private db: IDatastoreInterface,
    private cache: ICacheRepository
  ) {
    // Bind the methods to this class instance to ensure correct context.
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
  }

  // Handles user registration
  public async register(email: string, password: string): Promise<User | null> {
    try {
      const userExists = await this.db.getUser(email);
      if (userExists != null) {
        throw new CustomError("Auth service", "User already exists", 409);
      }
      const hashPwd = await BcryptHelper.hashString(password);
      const newUser = { email, password: hashPwd };
      const res = await this.db.createProfile(newUser);
      return res;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.name, error.message, error.statusCode);
      }
      throw new Error(String(error));
    }
  }

  // Handles user login and generates an authentication token (JWT)
  public async login(email: string, password: string): Promise<string | null> {
    try {
      let userEmail;
      let userPwd;

      // Retrieve the user's email and hashed password from the database
      const res = await this.db.getUser(email);
      userEmail = res?.email;
      userPwd = res?.password;

      // Check if the user exists in the database
      if (!res || res == null) {
        throw new CustomError(
          "Auth Service",
          `User ${email} not found in database`,
          404
        );
      }

      // Check if the user's email and password were retrieved successfully
      if (!userEmail || userEmail == undefined) {
        throw new CustomError(
          "Auth Service",
          `User's email ${email} not found`,
          404
        );
      }

      if (!userPwd || userPwd == undefined) {
        throw new CustomError(
          "Auth Service",
          `User ${email}'s password not found in database`,
          404
        );
      }

      // Compare the provided password with the hashed password in the database
      const matched = await BcryptHelper.compareHash(password, userPwd);
      if (!matched) {
        throw new CustomError(
          "Auth Service",
          "Password does not match the one in record",
          403
        );
      }

      // Create a JWT payload with the user's email and hashed password
      const userPayload: JwtPayload = { email: userEmail, password: userPwd };
      const userToken = JWTAuthenticationHelper.generateToken(userPayload);

      // Add JWT to cache for refresh token (mock)
      this.cache.add("token");

      return userToken;
    } catch (error) {
      // Handle any errors and rethrow as CustomError
      if (error instanceof CustomError) {
        throw new CustomError(error.name, error.message, error.statusCode);
      }
      throw new Error(String(error));
    }
  }

  // Retrieves user profile information from the database
  public async profile(email: string): Promise<User | null> {
    try {
      // Get the user profile from the database
      const res = await this.db.getProfile(email);

      // Check if the user profile exists
      if (!res || res == null) {
        throw new CustomError("Auth Service", "User not found", 404);
      }
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
