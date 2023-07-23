import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { formatDate } from "../../helper/time_helper";

const LoggingMiddleware = (logger: Logger) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const formattedDate = formatDate(new Date());
    logger.info(`${req.method} ${req.url} @ ${formattedDate}`);
    next();
  };
};

export default LoggingMiddleware;
