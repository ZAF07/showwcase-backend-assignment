import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../../types/types";
import CustomError from "../../errors/errors";

const secretKey = "extr4_s30r137-k3y";

export default class JWTAuthenticationHelper {
  private static readonly expiresIn: string = "20s";

  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, secretKey, { expiresIn: this.expiresIn });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
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
    (req as any).user = decodedUser;

    next();
  }
}
