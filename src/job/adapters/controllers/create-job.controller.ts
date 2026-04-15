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
import type { Job } from '@src/job/applications/contracts/job.interface';
import {
  CREATE_JOB_USE_CASE_INTERFACE,
  type CreateJobUseCaseInterface,
} from '@src/job/applications/contracts/create-job.use-case-interface';

@ApiTags('Job')
@Controller('job')
export class CreateJobController {
  constructor(
    @Inject(CREATE_JOB_USE_CASE_INTERFACE)
    private readonly createJobUseCase: CreateJobUseCaseInterface,
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
  async create(@Body() data: CreateJobDto): Promise<Job> {
    return this.createJobUseCase.execute(data);
  }
}
