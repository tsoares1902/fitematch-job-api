import type { JobPayload } from './job-payload.interface';
import type { JobRecord } from './job-record.interface';

export const UPDATE_JOB_REPOSITORY = 'UPDATE_JOB_REPOSITORY';

export interface UpdateJobRepositoryInterface {
  update(id: string, data: Partial<JobPayload>): Promise<JobRecord | null>;
}
