import { Router } from "express";
import { IHTTPAuthAdapter, IMiddleware } from "../../types/types";
import JWTAuthenticationHelper from "../../utils/middleware/auth_middleware/auth_middleware";

export default (handler: IHTTPAuthAdapter): Router => {
  const authRoutes: Router = Router();

  authRoutes.post(
    "/profile",
    JWTAuthenticationHelper.authenticate,
    handler.profile
  );
  authRoutes.post("/register", handler.register);
  authRoutes.post("/login", handler.login);

  return authRoutes;
};
