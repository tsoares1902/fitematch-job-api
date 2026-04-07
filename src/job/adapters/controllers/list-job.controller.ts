import { ConfigService } from '@nestjs/config';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  LIST_JOB_USE_CASE_INTERFACE,
  type ListJobUseCaseInterface,
} from '@src/job/applications/contracts/list-job.use-case-interface';
import { ListJobsQueryDto } from '../dto/list-jobs-query.dto';
import ListJobResponse from '@src/job/adapters/controllers/responses/list-job-response';
import { ResponseListJobsDto } from '@src/job/adapters/dto/responses/list-job-response.dto';

@ApiTags('Job')
@Controller('job')
export class ListJobController {
  constructor(
    @Inject(LIST_JOB_USE_CASE_INTERFACE)
    private readonly listJobUseCase: ListJobUseCaseInterface,
    private readonly listJobResponse: ListJobResponse,
    private readonly configService: ConfigService,
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
    try {
      const result = await this.listJobUseCase.execute({
        ...data,
        route: `${this.configService.get('JOB_API_URL') ?? ''}/job`,
      });

      return this.listJobResponse.response(result);
    } catch (error: unknown) {
      this.listJobResponse.catch(error);
    }
  }
}
