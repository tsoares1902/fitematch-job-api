import type { UpdateJobPayload } from './job-payload.interface';
import type { JobOutput } from './job-output.interface';

export const UPDATE_JOB_USE_CASE_INTERFACE = 'UPDATE_JOB_USE_CASE_INTERFACE';

export interface UpdateJobUseCaseInterface {
  execute(id: string, data: UpdateJobPayload): Promise<JobOutput>;
}
