import { NextFunction, Request, Response } from "express";
import { IUserService } from "../../../../core/ports/user_service_interface/user_service_interface";
import { IHTTPUserAdapter } from "../../../../types/types";
import CustomError from "../../../../utils/errors/errors";

// 💡 Controllers receives the request and converts the data into a DTO to pass to the service layer as a param

// This is the controller. I only need the service here. Because dependencies should point inward, we should receive the service in the constructor already initialiesd
// Adapter for the outside to interact with services via HTTP
export default class UserAdapterHTTP implements IHTTPUserAdapter {
  constructor(private userService: IUserService) {
    this.fetchRandomUser = this.fetchRandomUser.bind(this);
  }

  public async fetchRandomUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await this.userService.fetchRandomUser();
      if (!user || user == null) {
        // Could throw here, depending on business rules
        throw new CustomError("User Adapter", "no users found ", 404);
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
