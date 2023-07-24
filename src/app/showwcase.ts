import Express, { Application, Router } from "express";
import { createClient } from "redis";
import { ApplicationConfig } from "../types/types";
import { createRedisClient } from "../infrastructure/cache/cache_client";
import { ICacheRepository } from "../core/ports/cache_interface/cacheInterface";
import RedisCacheAdapter from "../adapters/cache/redisCache";
import { IUserService } from "../core/ports/user_service_interface/user_service_interface";
import { IAuthService } from "../core/ports/auth_service_interface/auth_service_interface";
import { UserService } from "../core/services/user/userService";
import AuthService from "../core/services/auth/auth_service";
import UserAdapterHTTP from "../adapters/api/internal/user_adapter/user_adapter";
import AuthAdapterHTTP from "../adapters/api/internal/auth_adapter/auth_adapter";
import UserRouters from "../routers/user-router/user_routers";
import AuthRouters from "../routers/auth-router/auth_routers";
import LoadConfig from "../config";
import { IFetchRandomUserAPI } from "../core/ports/api_interface/random_user_api_interface/random_user_api_interface";
import UserAPI from "../adapters/api/external/random_user/random_user_adapter";
import { Logger } from "winston";
import { CreateInfoLogger, CreateErrorLogger } from "../utils/logger/logger";
import ErrorMiddleware from "../utils/middleware/error_middleware/error_middleware";
import LoggingMiddleware from "../utils/middleware/logging_middleware/logging_middleware";
import PostgresDBAdapter from "../adapters/db/postgres/postgres";
import MockUserService from "../core/services/user/mock_user_service";
import MockPostgresDBAdapter from "../adapters/db/postgres/mock_postgres";
import MockAuthService from "../core/services/auth/mock_auth_service";
import JWTAuthenticationHelper from "../utils/middleware/auth_middleware/auth_middleware";

// The app class represents the entire app. It initialises all dependencies and starts the application ..
export default class App {
  public app: Application;
  private alogger: Logger;
  private elogger: Logger;
  private cacheClient: ReturnType<typeof createClient>;
  private cacheAdapter: ICacheRepository;
  private userServiceAPI: IFetchRandomUserAPI;
  private userService: IUserService;
  private authService: IAuthService;
  private userHandler: UserAdapterHTTP;
  private authHandler: AuthAdapterHTTP;
  private userRouters: Router;
  private authRouters: Router;
  private appConfig: ApplicationConfig;

  constructor() {
    this.appConfig = LoadConfig();
    this.app = Express();
    this.app.use(Express.json());

    // Sets the JWT expires time read from the config file
    JWTAuthenticationHelper.expiresIn = this.appConfig.jwt.expires;

    // Initialise all dependencies. The order matters
    this.initLogger();
    this.initCache();
    this.initExternalAPIs();
    this.initServices();
    this.initHanlders();
    this.initRoutes();
    this.useLoggingMiddleware();
    this.useRouters();
    this.useErrorMiddlewares();
  }

  private initCache() {
    this.cacheClient = createRedisClient();
    this.cacheAdapter = new RedisCacheAdapter(this.cacheClient);
  }

  private initExternalAPIs() {
    // 💡 This should be looping through a list of external APIs that the application needs. But for this test this is fine since we only have one external API to call
    this.userServiceAPI = new UserAPI(this.appConfig.externalService);
  }

  private initServices() {
    // 💡 We can control what modules to mock in the testing environment with env var
    // For this case, if env==test we are testing only the adapters and using MOCK Services and db/cache adapters.
    // This was we can perform unit test for each modules
    if (process.env.NODE_ENV == "test") {
      this.userService = new MockUserService();
      this.authService = new MockAuthService(new MockPostgresDBAdapter());
      return;
    }
    const pad = new PostgresDBAdapter(this.appConfig.datastore);
    this.authService = new AuthService(pad, this.cacheAdapter);
    this.userService = new UserService(this.cacheAdapter, this.userServiceAPI);
  }

  private initHanlders() {
    this.authHandler = new AuthAdapterHTTP(this.authService);
    this.userHandler = new UserAdapterHTTP(this.userService);
  }

  private initLogger() {
    this.alogger = CreateInfoLogger(this.appConfig.logger.logFile);
    this.elogger = CreateErrorLogger(this.appConfig.logger.errorFile);
  }

  private initRoutes() {
    this.authRouters = AuthRouters(this.authHandler);
    this.userRouters = UserRouters(this.userHandler);
  }

  private useLoggingMiddleware() {
    const loggingMiddleware = LoggingMiddleware(this.alogger);
    this.app.use(loggingMiddleware);
  }

  private useErrorMiddlewares() {
    const errorMiddleware = ErrorMiddleware(this.elogger);
    this.app.use(errorMiddleware);
  }

  private useRouters() {
    this.app.use("/api/auth", this.authRouters);
    this.app.use("/api/user", this.userRouters);
  }

  public start() {
    this.app.listen(this.appConfig.server.port, () => {
      console.log("Server started 👍");
    });
  }
}
