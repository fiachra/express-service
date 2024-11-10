import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import HttpError from '../lib/http-error';
import { logger } from '../lib/logger.js';

import { Prisma } from '@prisma/client'

function parsePrismaError (err: Error) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      status: 400,
      err: err
    }
  }
}

export type CelebrateErrorDetails = {
  segment: string;
  path: string | number;
  message: string;
};

export type ReturnError = {
  error: string;
  details: Error | CelebrateErrorDetails[];
};

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let errorStatus = 500;
  let returnError: ReturnError = {
    error: err.message,
    details: err,
  };

  if (err instanceof HttpError) {
    errorStatus = err.status;
  }

  if (isCelebrateError(err)) {
    returnError = {
      error: err.message,
      details: Array.from(err.details, ([name, value]) => {
        return {
          segment: name,
          path: value.details[0].path[0],
          message: value.details[0].message,
        };
      }),
    };
  } else {
    const p = parsePrismaError(err)
    if (p) {
      logger.error(err.stack)
      res.status(p.status).json(JSON.stringify(p.err))
      return
    }
  }

  res.status(errorStatus).json(returnError);
  logger.error(JSON.stringify(returnError));
}
