import config from "config";
import { configDefaultValues } from "./utils/constants/constants";
import { ApplicationConfig, datastore } from "./types/types";

const LoadAppConfig = (): ApplicationConfig => {
  console.log("CONFIG FILE USED: ====> ", config.get("cache.password"));
  const appConfig: ApplicationConfig = {
    server: {
      port: getConfigWithDefaultInt(
        "server.port",
        configDefaultValues.SERVER_PORT
      ),
    },
    jwt: {
      expires: getConfigWithDefaultString(
        "jwt.expires",
        configDefaultValues.JWT_EXPIRES
      ),
    },
    datastore: {
      name: getConfigWithDefaultString(
        "datastore.name",
        configDefaultValues.DATABASE_NAME
      ),
      user: getConfigWithDefaultString(
        "datastore.username",
        configDefaultValues.DATABASE_USER
      ),
      password: getConfigWithDefaultString(
        "datastore.password",
        configDefaultValues.DATABASE_PASSWORD
      ),
      host: getConfigWithDefaultString(
        "datastore.host",
        configDefaultValues.DATABASE_HOST
      ),
      port: getConfigWithDefaultInt(
        "datastore.port",
        configDefaultValues.DATABASE_PORT
      ),
      max_connection: getConfigWithDefaultInt(
        "datastore.max_connection",
        configDefaultValues.DATABASE_MAX_CONNS
      ),
      ssl: getConfigWithDefaultString(
        "datastore.ssl",
        configDefaultValues.DATABASE_SSL
      ),
      getConnString: function () {
        return `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
      },
    },
    cache: {
      type: getConfigWithDefaultString(
        "cache.type",
        configDefaultValues.CACHE_TYPE
      ),
      url: getConfigWithDefaultString(
        "cache.url",
        configDefaultValues.CACHE_URL
      ),
      password: getConfigWithDefaultString(
        "cache.password",
        configDefaultValues.CACHE_PASSWORD
      ),
      username: getConfigWithDefaultString(
        "cache.username",
        configDefaultValues.CACHE_USERNAME
      ),
    },
    externalService: {
      // This should be an array in real world application
      clientType: getConfigWithDefaultString(
        "random_user_service.client_type",
        configDefaultValues.RANDOM_USER_SERVICE_CLIENT_TYPE
      ),
      baseURL: getConfigWithDefaultString(
        "random_user_service.base_url",
        configDefaultValues.RANDOM_USER_SERVICE_BASE_URL
      ),
      path: getConfigWithDefaultString(
        "random_user_service.path",
        configDefaultValues.RANDOM_USER_SERVICE_PATH
      ),
      timeout: getConfigWithDefaultInt(
        "random_user_service.timeout",
        configDefaultValues.RANDOM_USER_SERVICE_CLIENT_TIMEOUT
      ),
      headers: {
        accept: getConfigWithDefaultString(
          "random_user_service.headers.accept",
          configDefaultValues.RANDOM_USER_SERVICE_CLIENT_HACCEPT
        ),
      },
    },
    logger: {
      errorFile: getConfigWithDefaultString(
        "logger.error_file",
        configDefaultValues.LOGGER_ERROR_FILE
      ),
      logFile: getConfigWithDefaultString(
        "logger.log_file",
        configDefaultValues.LOGGER_LOG_FILE
      ),
    },
  };

  return appConfig;
};

const getConfigWithDefaultInt = (key: string, defaultValue: any): number => {
  // if (defaultValue === undefined) {
  //   throw new Error("Config value is missing in app init");
  // }
  if (config.has(key)) {
    const val = config.get(key);
    return val !== null ? val : defaultValue;
  }

  return defaultValue;
};
const getConfigWithDefaultString = (key: string, defaultValue: any): string => {
  // if (defaultValue === undefined) {
  //   throw new Error("Config value is missing in app init");
  // }
  if (config.has(key)) {
    const val = config.get(key);
    return val !== null ? val : defaultValue;
  }

  return defaultValue;
};

export default LoadAppConfig;
