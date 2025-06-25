import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  
  const message = err.message || 'Something went wrong on the server.';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default errorHandler;
