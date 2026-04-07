import ResultPaginationInterface from '@src/shared/applications/contracts/result-pagination.interface';
import type { ListJobsQueryInterface } from './list-job-query.interface';
import type { ListJobResponseDto } from '@src/job/adapters/dto/responses/list-job.response.dto';

export const LIST_JOB_USE_CASE_INTERFACE = 'LIST_JOB_USE_CASE_INTERFACE';

export interface ResultListJobUseCaseInterface {
  data: ListJobResponseDto[];
  metadata: { pagination: ResultPaginationInterface };
}

export interface DataListJobsUseCaseInterface extends ListJobsQueryInterface {
  route: string;
}

export default interface ListJobsUseCaseInterface {
  execute(
    data: DataListJobsUseCaseInterface,
  ): Promise<ResultListJobUseCaseInterface>;
}
