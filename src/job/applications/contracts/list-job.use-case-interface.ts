import type ListJobsUseCaseInterface from '@src/job/applications/contracts/result-list-job.use-case.interface';
import type {
  DataListJobsUseCaseInterface,
  ResultListJobUseCaseInterface,
} from '@src/job/applications/contracts/result-list-job.use-case.interface';

export const LIST_JOB_USE_CASE_INTERFACE = 'LIST_JOB_USE_CASE_INTERFACE';

export type { DataListJobsUseCaseInterface, ResultListJobUseCaseInterface };
export type ListJobUseCaseInterface = ListJobsUseCaseInterface;
