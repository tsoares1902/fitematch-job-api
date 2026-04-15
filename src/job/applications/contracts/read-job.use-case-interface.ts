import type { JobOutput } from './job-output.interface';

export const READ_JOB_USE_CASE_INTERFACE = 'READ_JOB_USE_CASE_INTERFACE';

export interface ReadJobUseCaseInterface {
  execute(id: string): Promise<JobOutput>;
}
