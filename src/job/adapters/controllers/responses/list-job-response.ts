import { Injectable } from '@nestjs/common';
import AbstractResponse from '@src/job/adapters/controllers/responses/abstract-response';
import { ResultListJobUseCaseInterface } from '@src/job/applications/contracts/result-list-job.use-case.interface';
import { ResponseListJobsDto } from '@src/job/adapters/dto/responses/list-job-response.dto';

@Injectable()
export default class ListJobResponse extends AbstractResponse {
  response(data: ResultListJobUseCaseInterface): ResponseListJobsDto {
    return { data: data.data, metadata: data.metadata };
  }
}
