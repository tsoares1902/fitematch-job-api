import type { UpdateJobPayload } from './job-payload.interface';
import type { Job } from '@src/job/applications/contracts/job.interface';

export const UPDATE_JOB_USE_CASE_INTERFACE = 'UPDATE_JOB_USE_CASE_INTERFACE';

export interface UpdateJobUseCaseInterface {
  execute(id: string, data: UpdateJobPayload): Promise<Job>;
}
