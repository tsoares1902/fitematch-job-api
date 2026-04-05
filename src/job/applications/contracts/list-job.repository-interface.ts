import type { JobRecord } from './job-record.interface';

export const LIST_JOB_REPOSITORY = 'LIST_JOB_REPOSITORY';

export interface ListJobRepositoryInterface {
  list(): Promise<JobRecord[]>;
}
