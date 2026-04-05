import type { JobRoleEnum } from './job-role.enum';
import type { JobStatusEnum } from './job-status.enum';

export interface JobPayload {
  companyId: string;
  slug: string;
  title: string;
  slots: number;
  isPaidAdvertising?: boolean;
  role: JobRoleEnum;
  status: JobStatusEnum;
}
