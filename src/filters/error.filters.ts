import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string | string[];
  details?: string | string[] | Record<string, any>;
}

function hasMessageProperty(obj: any): obj is { message: string | string[] } {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log(exception);

    let status: number;
    let errorName: string;
    let errorMessage: string | string[];
    let errorDetails: string | string[] | Record<string, any> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorName = exception.constructor.name;
      const exceptionResponse = exception.getResponse();
      errorMessage = hasMessageProperty(exceptionResponse)
        ? exceptionResponse.message
        : JSON.stringify(exceptionResponse);
      errorDetails = (exceptionResponse as Record<string, unknown>).details;
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorName = exception.constructor.name;
      errorMessage = `Database error: ${
        (exception as QueryFailedError).message
      }`;
    } else if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      errorName = exception.constructor.name;
      errorMessage = 'Validation error';
      errorDetails = (exception as ValidationError).toString();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorName = 'InternalServerError';
      errorMessage = 'Internal server error';
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      error: errorName,
      message: errorMessage,
      details: errorDetails,
    };

    response.status(status).json(errorResponse);
  }
}
