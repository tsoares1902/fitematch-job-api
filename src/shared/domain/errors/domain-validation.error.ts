import { DomainError } from './domain-error';

export class DomainValidationError extends DomainError {
  constructor(message: string) {
    super(message, 'DOMAIN_VALIDATION_ERROR');
    this.name = 'DomainValidationError';
  }
}
