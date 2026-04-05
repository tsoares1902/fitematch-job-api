import type { JobPayload } from './job-payload.interface';
import type { Job } from './job.interface';

export const CREATE_JOB_USE_CASE = 'CREATE_JOB_USE_CASE';

export interface CreateJobUseCaseInterface {
  execute(data: JobPayload): Promise<Job>;
}
