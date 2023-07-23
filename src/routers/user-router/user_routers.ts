import { Router } from "express";
import { IHTTPUserAdapter } from "../../types/types";

export default (handler: IHTTPUserAdapter): Router => {
  const userRoutes: Router = Router();

  userRoutes.get("/random", handler.fetchRandomUser);

  return userRoutes;
};
