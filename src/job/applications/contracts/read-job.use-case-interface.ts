import type { ReadJobResponseDto } from '@src/job/adapters/dto/responses/read-job.response.dto';

export const READ_JOB_USE_CASE_INTERFACE = 'READ_JOB_USE_CASE_INTERFACE';

export interface ReadJobUseCaseInterface {
  execute(id: string): Promise<ReadJobResponseDto>;
}
