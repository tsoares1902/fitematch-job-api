import type { JobBenefits } from '@src/job/domain/entities/job.entity';
import type { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import type { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';

export interface JobRecord {
  id: string;
  companyId: string;
  isPaidAdvertising?: boolean;
  slug: string;
  title: string;
  slots: number;
  cover: string;
  benefits: JobBenefits;
  role: JobRoleEnum;
  status: JobStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
