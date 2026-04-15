import { Body, Controller, Inject, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateJobDto } from '@src/job/adapters/dto/update-job.dto';
import { UpdateJobResponseDto } from '@src/job/adapters/dto/responses/update-job.response.dto';
import {
  UPDATE_JOB_USE_CASE_INTERFACE,
  type UpdateJobUseCaseInterface,
} from '@src/job/applications/contracts/update-job.use-case-interface';
import { JobResponseMapper } from '@src/job/adapters/controllers/responses/job-response.mapper';

@ApiTags('Job')
@Controller('job')
export class UpdateJobController {
  constructor(
    @Inject(UPDATE_JOB_USE_CASE_INTERFACE)
    private readonly updateJobUseCase: UpdateJobUseCaseInterface,
    private readonly jobResponseMapper: JobResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'Update job',
    description: 'Updates an existing job by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'Job identifier.' })
  @ApiBody({ type: UpdateJobDto })
  @ApiOkResponse({
    description: 'Job updated successfully.',
    type: UpdateJobResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiNotFoundResponse({
    description: 'Job not found!',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateJobDto,
  ): Promise<UpdateJobResponseDto> {
    return this.jobResponseMapper.toResponse(
      await this.updateJobUseCase.execute(id, data),
    );
  }
}
