import type { JobBenefits } from '@src/job/applications/contracts/job.interface';
import type { JobRoleEnum } from '@src/job/applications/contracts/job-role.enum';
import type { JobStatusEnum } from '@src/job/applications/contracts/job-status.enum';

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
