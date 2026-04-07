import type { JobRoleEnum } from '@src/job/applications/contracts/job-role.enum';
import type { JobStatusEnum } from '@src/job/applications/contracts/job-status.enum';
import type { Company } from '@src/company/applications/contracts/company.interface';

export interface JobBenefits {
  salary?: number | null;
  transportation: boolean;
  alimentation: boolean;
  health: boolean;
  parking: boolean;
  bonus: string;
}

export interface Job {
  id?: string;
  companyId: string;
  isPaidAdvertising?: boolean;
  slug: string;
  title: string;
  slots: number;
  cover: string;
  benefits: JobBenefits;
  role: JobRoleEnum;
  status: JobStatusEnum;
  company: Company;
  createdAt?: Date;
  updatedAt?: Date;
}
