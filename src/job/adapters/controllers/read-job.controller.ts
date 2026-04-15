import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReadJobResponseDto } from '@src/job/adapters/dto/responses/read-job.response.dto';
import {
  READ_JOB_USE_CASE_INTERFACE,
  type ReadJobUseCaseInterface,
} from '@src/job/applications/contracts/read-job.use-case-interface';
import { JobResponseMapper } from '@src/job/adapters/controllers/responses/job-response.mapper';

@ApiTags('Job')
@Controller('job')
export class ReadJobController {
  constructor(
    @Inject(READ_JOB_USE_CASE_INTERFACE)
    private readonly readJobUseCase: ReadJobUseCaseInterface,
    private readonly jobResponseMapper: JobResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'Get job by id',
    description: 'Returns a job by the provided identifier.',
  })
  @ApiParam({ name: 'id', description: 'Job identifier.' })
  @ApiOkResponse({
    description: 'Job found successfully.',
    type: ReadJobResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Job not found!',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ReadJobResponseDto> {
    return this.jobResponseMapper.toResponse(
      await this.readJobUseCase.execute(id),
    );
  }
}
