import { createLogger, transports, format, Logger } from "winston";

const CreateInfoLogger = (logFile: string): Logger => {
  return createLogger({
    level: "info",
    format: format.json(),
    transports: [
      new transports.File({
        filename: logFile,
      }),
    ],
  });
};

const CreateErrorLogger = (logFile: string): Logger => {
  return createLogger({
    level: "error",
    format: format.json(),
    transports: [new transports.File({ filename: logFile })],
  });
};

export { CreateInfoLogger, CreateErrorLogger };
