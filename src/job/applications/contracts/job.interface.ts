import type { JobRoleEnum } from './job-role.enum';
import type { JobStatusEnum } from './job-status.enum';
import type { Company } from '@src/company/applications/contracts/company.interface';

export interface Job {
  id?: string;
  companyId: string;
  slug: string;
  title: string;
  slots: number;
  role: JobRoleEnum;
  status: JobStatusEnum;
  company: Company;
  createdAt?: Date;
  updatedAt?: Date;
}
