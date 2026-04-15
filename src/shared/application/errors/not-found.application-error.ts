import { ApplicationError } from './application-error';

export class NotFoundApplicationError extends ApplicationError {
  constructor(message: string) {
    super(message, 404, 'RESOURCE_NOT_FOUND');
    this.name = 'NotFoundApplicationError';
  }
}
