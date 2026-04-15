import type { JobBenefits } from '@src/job/domain/entities/job.entity';
import type { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import type { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';

export interface JobPayload {
  companyId: string;
  slug: string;
  title: string;
  slots: number;
  cover: string;
  benefits: JobBenefits;
  isPaidAdvertising?: boolean;
  role: JobRoleEnum;
  status: JobStatusEnum;
}

export type UpdateJobPayload = Partial<Omit<JobPayload, 'benefits'>> & {
  benefits?: Partial<JobBenefits>;
};
