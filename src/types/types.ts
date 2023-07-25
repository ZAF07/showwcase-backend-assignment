import { NextFunction, Request, Response } from "express";
import { Application } from "express";

export interface IHTTPUserAdapter {
  fetchRandomUser(reg: Request, res: Response, next: NextFunction): void;
}

export interface IHTTPAuthAdapter {
  login(req: Request, res: Response, next: NextFunction): void;
  register(req: Request, res: Response, next: NextFunction): void;
  profile(req: Request, res: Response, next: NextFunction): void;
}

export interface IAPIClient {
  get(): any;
  setHTTPStrategy(): void;
}

export interface IHTTPStrategy {
  executeGet(): any;
  swithcHost(): void;
}

export interface ILogger {
  log(msg: string): void;
  setLogFileName(fileName: string): void;
}

// Logger interface
export interface ILoggerInterface {
  useLogger(app: Application): any;
}

export type ApplicationConfig = {
  server: { port: number };
  jwt: { expires: string; secret: string };
  datastore: datastore;
  cache: { type: string; url: string; password: string; username: string };
  externalService: externalService;
  logger: { logFile: string; errorFile: string };
};

export type datastore = {
  name: string;
  user: string;
  password: string;
  host: string;
  port: number;
  max_connection?: number;
  ssl: string;
  getConnString: () => string;
};

export type externalService = {
  clientType: string;
  baseURL: string;
  path: string;
  timeout: number;
  headers: headers;
};
type headers = { accept: string };

export type JwtPayload = { email: string; password: string };

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}
