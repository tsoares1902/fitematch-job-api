import type { Job } from './job.interface';

export const LIST_JOB_USE_CASE = 'LIST_JOB_USE_CASE';

export interface ListJobUseCaseInterface {
  execute(): Promise<Job[]>;
}
