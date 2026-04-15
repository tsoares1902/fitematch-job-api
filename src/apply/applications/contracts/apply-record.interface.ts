import type { ApplyStatusEnum } from '@src/apply/domain/enums/apply-status.enum';

export interface ApplyRecord {
  id: string;
  companyId: string;
  jobId: string;
  userId: string;
  status: ApplyStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
