import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../../../core/ports/auth_service_interface/auth_service_interface";
import CustomError from "../../../../utils/errors/errors";

// Adapter for the outside to interact with services via HTTP
export default class AuthAdapterHTTP {
  constructor(private authService: IAuthService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = await this.authService.register(email, password);
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
          "Missing data in request body",
          400
        );
      }
      const token = await this.authService.login(email, password);
      res.json({ message: "login success", token });
    } catch (error) {
      next(error);
    }
  }

  public async profile(req: Request, res: Response, next: NextFunction) {
    // Implement the JWT middleware. That is the module that checks for the use's token. if not exsits, return error
    try {
      const { email } = req.body;
      if (!email) {
        throw new CustomError("Auth Adapter", "Missing data in request", 400);
      }

      const data = await this.authService.profile(String(email));
      res.json({ message: "profile", data });
    } catch (error) {
      next(error);
    }
  }
}