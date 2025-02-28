import path from 'path';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import winstonDailyRotate from 'winston-daily-rotate-file';

import type { Request, Response, NextFunction } from 'express';

export class HttpException extends Error {
  public status: number
  public message: string
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

const logDirectory = path.join(__dirname, "../logs");
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
};

const logger = createLogger({
  levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new winstonDailyRotate({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(logDirectory, "error"),
      filename: `%DATE%.error.log`,
      maxFiles: '90d',
      zippedArchive: true,
    }),
    new winstonDailyRotate({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(logDirectory, "warn"),
      filename: `%DATE%.warn.log`,
      maxFiles: '90d',
      zippedArchive: true,
    }),
    new winstonDailyRotate({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(logDirectory, "info"),
      filename: `%DATE%.info.log`,
      maxFiles: '90d',
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export const Logger = morgan((tokens, req, res) => {
  const statusCode = res.statusCode;
  if (statusCode < 500) {
    const logMessage = `[${tokens.method(req, res)}] ${tokens.url(req, res)} | ${tokens.status(req, res)} | ${tokens["response-time"](req, res)}ms`;
		logger.info(logMessage);
	}
	return null;
})

export const ErrorLogger = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status;
	const stackLines = error?.stack?.split("\n");
	const truncatedStack = stackLines?.slice(0, 5)?.join("\n");
	const reqBodyString = JSON.stringify(req.body);
	const reqQueryString = JSON.stringify(req.query);
  const errorMessage = `[${req.method}] ${req.path} | ${statusCode} | ${req.headers} | [BODY] ${reqBodyString} | [QUERY] ${reqQueryString} | ${truncatedStack}`;
	logger.error(errorMessage);
  res.status(statusCode).send(error.message);
}
