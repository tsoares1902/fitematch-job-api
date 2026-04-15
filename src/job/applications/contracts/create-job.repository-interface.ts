import type { JobPayload } from './job-payload.interface';
import type { JobRecord } from './job-record.interface';

export const CREATE_JOB_REPOSITORY_INTERFACE =
  'CREATE_JOB_REPOSITORY_INTERFACE';

export interface CreateJobRepositoryInterface {
  create(data: JobPayload): Promise<JobRecord>;
}
