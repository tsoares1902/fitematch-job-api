import type { ListJobsQueryInterface } from '@src/job/applications/contracts/list-job-query.interface';
import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';

export const LIST_JOB_REPOSITORY_INTERFACE = 'LIST_JOB_REPOSITORY_INTERFACE';

export interface ListJobRepositoryResult {
  data: JobRecord[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface ListJobRepositoryInterface {
  list(filters: ListJobsQueryInterface): Promise<ListJobRepositoryResult>;
}
