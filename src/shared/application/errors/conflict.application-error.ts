import { ApplicationError } from './application-error';

export class ConflictApplicationError extends ApplicationError {
  constructor(message: string) {
    super(message, 409, 'RESOURCE_CONFLICT');
    this.name = 'ConflictApplicationError';
  }
}
