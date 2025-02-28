import path from 'path';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import winstonDailyRotate from 'winston-daily-rotate-file';

import { HttpException } from '@/modules/HttpException';
import type { Request, Response, NextFunction } from 'express';

type Level = 'error' | 'info';
const logDirectory = path.join(__dirname, "../logs");
const levels = {
	error: 0,
	info: 1,
};

const getNewWinstonDailyRotate = (level: Level) => {
  return new winstonDailyRotate({
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: path.join(logDirectory, level),
    filename: `%DATE%.${level}.log`,
    maxFiles: '90d',
    zippedArchive: true,
  })
}

export const logger = createLogger({
  levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.json(),
  ),
  transports: [
    getNewWinstonDailyRotate('error'),
    getNewWinstonDailyRotate('info'),
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
  const logMessage = `[${tokens.method(req, res)}] ${tokens.url(req, res)} | ${tokens.status(req, res)} | ${tokens["response-time"](req, res)}ms`;
  const statusCode = res.statusCode;
  if (statusCode < 500) {
		logger.info(logMessage);
	}
	return null;
})

export const ErrorLogger = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status;
  console.log('ErrorLogger ::::: ', statusCode);
	const stackLines = error?.stack?.split("\n");
	const truncatedStack = stackLines?.slice(0, 5)?.join("\n");
	const reqBodyString = JSON.stringify(req.body);
	const reqQueryString = JSON.stringify(req.query);
  const errorMessage = `[${req.method}] ${req.path} | ${statusCode} | [BODY] ${reqBodyString} | [QUERY] ${reqQueryString} | ${truncatedStack}`;
	logger.error(errorMessage);
  res.status(statusCode).send(error.message);
}
