import type { JobPayload } from './job-payload.interface';
import type { Job } from '@src/job/applications/contracts/job.interface';

export const CREATE_JOB_USE_CASE_INTERFACE = 'CREATE_JOB_USE_CASE_INTERFACE';

export interface CreateJobUseCaseInterface {
  execute(data: JobPayload): Promise<Job>;
}
