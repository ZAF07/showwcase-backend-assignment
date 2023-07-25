import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../../types/types";
import CustomError from "../../errors/errors";

declare global {
  namespace Express {
    interface Request {
      user?: { email: string }; // Add this to extend the Request interface
    }
  }
}
export default class JWTAuthenticationHelper {
  public static expiresIn: string = "30s";
  public static secret: string = "extr4_s30r137-k3y";

  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  static authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;
    if (!token) {
      throw new CustomError(
        "Auth middleware",
        "Unauthorised. Token missing",
        401
      );
    }

    const decodedUser = JWTAuthenticationHelper.verifyToken(
      token
    ) as JwtPayload | null;

    if (!decodedUser) {
      next(
        new CustomError("Auth Middleware", "Unauthorised. Token expired", 401)
      );
    }

    // Set the decoded user payload in the request object for further processing
    (req as any).user = decodedUser?.email;

    next();
  }
}
