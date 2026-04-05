import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  DELETE_JOB_USE_CASE,
  type DeleteJobUseCaseInterface,
} from '@src/job/applications/contracts/delete-job.use-case-interface';

@ApiTags('Job')
@Controller('job')
export class DeleteJobController {
  constructor(
    @Inject(DELETE_JOB_USE_CASE)
    private readonly deleteJobUseCase: DeleteJobUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Delete job',
    description: 'Deletes an existing job by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'Job identifier.' })
  @ApiNoContentResponse({
    description: 'Job deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Job not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteJobUseCase.execute(id);
  }
}
