import type { JobRoleEnum } from './job-role.enum';
import type { JobStatusEnum } from './job-status.enum';

export interface JobRecord {
  id: string;
  companyId: string;
  slug: string;
  title: string;
  slots: number;
  role: JobRoleEnum;
  status: JobStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
