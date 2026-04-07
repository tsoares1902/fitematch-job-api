import type { JobRoleEnum } from '@src/job/applications/contracts/job-role.enum';
import type { JobStatusEnum } from '@src/job/applications/contracts/job-status.enum';

export type ListJobsSortField =
  | 'isPaidAdvertising'
  | 'slug'
  | 'title'
  | 'createdAt'
  | 'updatedAt';

export type ListJobsSortOrder = 'asc' | 'desc';

export interface ListJobsQueryInterface {
  id?: string;
  companyId?: string;
  isPaidAdvertising?: boolean;
  slug?: string;
  title?: string;
  slots?: number;
  cover?: string;
  role?: JobRoleEnum;
  status?: JobStatusEnum;
  page?: number;
  limit?: number;
  route?: string;
  sortBy?: ListJobsSortField;
  sortOrder?: ListJobsSortOrder;
}
