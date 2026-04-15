import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateJobDto } from '@src/job/adapters/dto/create-job.dto';
import { CreateJobResponseDto } from '@src/job/adapters/dto/responses/create-job.response.dto';
import {
  CREATE_JOB_USE_CASE_INTERFACE,
  type CreateJobUseCaseInterface,
} from '@src/job/applications/contracts/create-job.use-case-interface';
import { JobResponseMapper } from '@src/job/adapters/controllers/responses/job-response.mapper';

@ApiTags('Job')
@Controller('job')
export class CreateJobController {
  constructor(
    @Inject(CREATE_JOB_USE_CASE_INTERFACE)
    private readonly createJobUseCase: CreateJobUseCaseInterface,
    private readonly jobResponseMapper: JobResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'Create job',
    description: 'Creates a new job.',
  })
  @ApiBody({ type: CreateJobDto })
  @ApiCreatedResponse({
    description: 'Job created successfully.',
    type: CreateJobResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiConflictResponse({
    description: 'Job slug already exists.',
  })
  @Post()
  async create(@Body() data: CreateJobDto): Promise<CreateJobResponseDto> {
    return this.jobResponseMapper.toResponse(
      await this.createJobUseCase.execute(data),
    );
  }
}
