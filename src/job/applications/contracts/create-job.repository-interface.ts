import type { JobPayload } from './job-payload.interface';
import type { JobRecord } from './job-record.interface';

export const CREATE_JOB_REPOSITORY = 'CREATE_JOB_REPOSITORY';

export interface CreateJobRepositoryInterface {
  create(data: JobPayload): Promise<JobRecord>;
}
