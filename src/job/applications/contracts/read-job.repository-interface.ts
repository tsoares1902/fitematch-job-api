import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';

export const READ_JOB_REPOSITORY_INTERFACE = 'READ_JOB_REPOSITORY_INTERFACE';

export interface ReadJobRepositoryInterface {
  findById(id: string): Promise<JobRecord | null>;
}
