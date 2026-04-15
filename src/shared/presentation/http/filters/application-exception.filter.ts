import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import { HttpErrorMapper } from '@src/shared/presentation/http/errors/http-error.mapper';

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly httpErrorMapper = new HttpErrorMapper();

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const httpError = this.httpErrorMapper.toHttpError(exception);

    response.status(httpError.statusCode).json(httpError);
  }
}
