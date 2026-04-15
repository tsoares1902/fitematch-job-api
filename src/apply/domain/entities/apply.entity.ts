import { DomainValidationError } from '@src/shared/domain/errors/domain-validation.error';
import { ApplyStatusEnum as ApplyStatusDefault } from '@src/apply/domain/enums/apply-status.enum';
import type { ApplyStatusEnum } from '@src/apply/domain/enums/apply-status.enum';

export interface ApplyProps {
  companyId: string;
  jobId: string;
  userId: string;
  status?: ApplyStatusEnum;
}

export type Apply = ApplyProps;

export class ApplyEntity {
  private constructor(private readonly props: Required<ApplyProps>) {}

  static create(data: ApplyProps): ApplyEntity {
    ApplyEntity.validateRequiredIdentifier(data.companyId, 'companyId');
    ApplyEntity.validateRequiredIdentifier(data.jobId, 'jobId');
    ApplyEntity.validateRequiredIdentifier(data.userId, 'userId');

    return new ApplyEntity({
      companyId: data.companyId.trim(),
      jobId: data.jobId.trim(),
      userId: data.userId.trim(),
      status: data.status ?? ApplyStatusDefault.ACTIVE,
    });
  }

  toPrimitives(): Required<ApplyProps> {
    return {
      companyId: this.props.companyId,
      jobId: this.props.jobId,
      userId: this.props.userId,
      status: this.props.status,
    };
  }

  static normalizeUpdate(data: Partial<Apply>): Partial<Apply> {
    const normalized: Partial<Apply> = {};

    if (data.status !== undefined) {
      normalized.status = data.status;
    }

    return normalized;
  }

  private static validateRequiredIdentifier(
    value: string,
    fieldName: string,
  ): void {
    if (!value || !value.trim()) {
      throw new DomainValidationError(`${fieldName} is required`);
    }
  }
}
