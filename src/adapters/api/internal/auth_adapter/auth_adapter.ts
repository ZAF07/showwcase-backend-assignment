import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../../../core/ports/auth_service_interface/auth_service_interface";
import CustomError from "../../../../utils/errors/errors";
import { User } from "../../../../core/domain/models/user";

declare global {
  namespace Express {
    interface Request {
      user?: { email: string }; // Add this to extend the Request interface
    }
  }
}

// Adapter for the outside to interact with services via HTTP (Controllers)
export default class AuthAdapterHTTP {
  constructor(private authService: IAuthService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new CustomError("Auth Service", "Missing required fields", 400);
      }
      const user: User = { email, password };
      const data = await this.authService.register(user);
      res.json({ message: "success", data });
    } catch (error) {
      next(error);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new CustomError(
          "Auth Adapter",
          "User email or password is missing in request body",
          400
        );
      }
      const currentUser = { email, password };
      const token = await this.authService.login(currentUser);
      res.json({ message: "login success", token });
    } catch (error) {
      next(error);
    }
  }

  public async profile(req: Request, res: Response, next: NextFunction) {
    try {
      // Retrieved user email from the auth middleware
      const email = req.user;
      if (!email || email == undefined) {
        throw new CustomError("Auth Adapter", "Missing email in request", 400);
      }

      const data = await this.authService.profile(String(email));
      res.json({ message: "profile", data });
    } catch (error) {
      next(error);
    }
  }
}
