import type { JobRecord } from './job-record.interface';

export const READ_JOB_REPOSITORY = 'READ_JOB_REPOSITORY';

export interface ReadJobRepositoryInterface {
  findById(id: string): Promise<JobRecord | null>;
}
