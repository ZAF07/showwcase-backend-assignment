import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { formatDate } from "../../helper/time_helper";
import CustomError from "../../errors/errors";

const ErrorMiddleware = (logger: Logger) => {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    const formattedDate = formatDate(new Date());

    // Handle custom errors
    if (error instanceof CustomError) {
      logger.error(
        ` Error: ${error.message} Meta: ${req.method} ${req.url} @ ${formattedDate}`
      );

      return res.status(error.statusCode).json({ error: error.message });
    }

    logger.error(
      `${error.message} Meta: ${req.method} ${req.url} @ ${formattedDate}`
    );
    // Handle other errors
    return res.status(500).json({ message: "Internal error. Try again" });
  };
};

export default ErrorMiddleware;
