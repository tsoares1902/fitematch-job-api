import type { JobPayload } from './job-payload.interface';
import type { JobOutput } from './job-output.interface';

export const CREATE_JOB_USE_CASE_INTERFACE = 'CREATE_JOB_USE_CASE_INTERFACE';

export interface CreateJobUseCaseInterface {
  execute(data: JobPayload): Promise<JobOutput>;
}
