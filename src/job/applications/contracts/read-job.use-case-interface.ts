import type { Job } from './job.interface';

export const READ_JOB_USE_CASE = 'READ_JOB_USE_CASE';

export interface ReadJobUseCaseInterface {
  execute(id: string): Promise<Job>;
}
