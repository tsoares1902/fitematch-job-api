import type { JobPayload } from './job-payload.interface';
import type { Job } from './job.interface';

export const UPDATE_JOB_USE_CASE = 'UPDATE_JOB_USE_CASE';

export interface UpdateJobUseCaseInterface {
  execute(id: string, data: Partial<JobPayload>): Promise<Job>;
}
