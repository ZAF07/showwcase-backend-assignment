import CustomError from "../../../utils/errors/errors";
import { User } from "../../domain/models/user";
import { IAuthService } from "../../ports/auth_service_interface/auth_service_interface";
import { IDatastoreInterface } from "../../ports/datastore_interface/datastore_interface";
import JWTAuthenticationHelper from "../../../utils/middleware/auth_middleware/auth_middleware";
import { JwtPayload } from "../../../types/types";

export default class MockAuthService implements IAuthService {
  constructor(private db: IDatastoreInterface) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
  }

  public async register(user: User): Promise<User | null> {
    try {
      const { email, password } = user;
      if (!email || !password) {
        throw new CustomError(
          "Auth Service",
          "Missing email or password in request",
          400
        );
      }

      const newUser: User = { email, password };
      const currentUser = await this.db.getUser(newUser.email);
      if (currentUser !== null) {
        throw new CustomError("Auth service", "User already exists", 409);
      }

      const res = await this.db.createProfile(newUser);
      return res;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.name, error.message, error.statusCode);
      }
      throw new Error(String(error));
    }
  }

  public async login(user: User): Promise<string | null> {
    // This is the testing user that is in the mock db
    // { email: "mock@mail.com", password: "000" };
    try {
      let userEmail;
      let userPwd;

      const { email, password } = user;
      if (!email || !password) {
        throw new CustomError(
          "Auth Service",
          "User email or password is missing in request",
          400
        );
      }

      const res = await this.db.getUser(email);
      if (!res || res == null) {
        throw new CustomError(
          "Auth Service",
          `User ${email} not found in database`,
          404
        );
      }

      userEmail = res?.email;
      userPwd = res?.password;
      if (!userEmail || userEmail == undefined) {
        throw new CustomError(
          "Auth Service",
          `User ${email} not found in database`,
          404
        );
      }

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

      // 🚨 Don't have to decrypt in testing environment
      //   const matched = await BcryptHelper.compareHash(password, userPwd);
      //   if (!matched) {
      //     throw new CustomError(
      //       "Auth Service",
      //       "Password does not match the one in record",
      //       403
      //     );
      //   }

      const userPayload: JwtPayload = { email: userEmail, password: userPwd };
      const userToken = JWTAuthenticationHelper.generateToken(userPayload);

      return userToken;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.name, error.message, error.statusCode);
      }
      throw new Error(String(error));
    }
  }

  public async profile(email: string): Promise<User | null> {
    try {
      if (!email || email == "") {
        throw new CustomError(
          "Auth Service",
          "User email not found in request",
          400
        );
      }
      const res = await this.db.getProfile(email);
      if (!res || res == null) {
        throw new CustomError("Auth Service", "User not found", 404);
      }
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
