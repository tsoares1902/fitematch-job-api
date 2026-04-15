import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  LIST_JOB_USE_CASE_INTERFACE,
  type ListJobUseCaseInterface,
} from '@src/job/applications/contracts/list-job.use-case-interface';
import { ListJobsQueryDto } from '../dto/list-jobs-query.dto';
import { JobResponseMapper } from '@src/job/adapters/controllers/responses/job-response.mapper';
import { ResponseListJobsDto } from '@src/job/adapters/dto/responses/list-job-response.dto';

@ApiTags('Job')
@Controller('job')
export class ListJobController {
  constructor(
    @Inject(LIST_JOB_USE_CASE_INTERFACE)
    private readonly listJobUseCase: ListJobUseCaseInterface,
    private readonly jobResponseMapper: JobResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'List jobs',
    description: 'Returns the list of registered jobs.',
  })
  @ApiOkResponse({
    description: 'Jobs listed successfully.',
    type: ResponseListJobsDto,
  })
  @Get()
  async handler(@Query() data: ListJobsQueryDto): Promise<ResponseListJobsDto> {
    const result = await this.listJobUseCase.execute(data);

    return this.jobResponseMapper.toListResponse(result);
  }
}
