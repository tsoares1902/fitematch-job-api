import { HttpException } from '@nestjs/common';
import { ApplicationError } from '@src/shared/application/errors/application-error';
import { DomainError } from '@src/shared/domain/errors/domain-error';
import type { HttpErrorResponse } from '@src/shared/presentation/http/errors/http-error-response.interface';

export class HttpErrorMapper {
  toHttpError(exception: unknown): HttpErrorResponse {
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === 'string') {
        return {
          statusCode,
          message: response,
          error: exception.name,
        };
      }

      if (typeof response === 'object' && response !== null) {
        const payload = response as Record<string, unknown>;
        const message =
          typeof payload.message === 'string'
            ? payload.message
            : 'HTTP Exception';
        const error =
          typeof payload.error === 'string' ? payload.error : exception.name;
        const code =
          typeof payload.code === 'string' ? payload.code : undefined;

        return {
          statusCode,
          message,
          error,
          ...(code ? { code } : {}),
        };
      }
    }

    if (exception instanceof DomainError) {
      return {
        statusCode: 400,
        message: exception.message,
        error: exception.name,
        code: exception.code,
      };
    }

    if (exception instanceof ApplicationError) {
      return {
        statusCode: exception.statusCode,
        message: exception.message,
        error: exception.name,
        code: exception.code,
      };
    }

    return {
      statusCode: 500,
      message: 'An unexpected error occurred!',
      error: 'InternalServerError',
      code: 'INTERNAL_SERVER_ERROR',
    };
  }
}
