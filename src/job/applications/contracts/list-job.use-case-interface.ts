import type { ListJobsOutput } from '@src/job/applications/contracts/job-output.interface';
import type { ListJobsQueryInterface } from '@src/job/applications/contracts/list-job-query.interface';

export const LIST_JOB_USE_CASE_INTERFACE = 'LIST_JOB_USE_CASE_INTERFACE';

export type DataListJobsUseCaseInterface = ListJobsQueryInterface;
export type ResultListJobUseCaseInterface = ListJobsOutput;

export interface ListJobUseCaseInterface {
  execute(data: ListJobsQueryInterface): Promise<ListJobsOutput>;
}
