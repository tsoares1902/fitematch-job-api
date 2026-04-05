import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  DELETE_APPLY_USE_CASE,
  type DeleteApplyUseCaseInterface,
} from '@src/apply/applications/contracts/delete-apply.use-case-interface';

@ApiTags('Apply')
@Controller('apply')
export class DeleteApplyController {
  constructor(
    @Inject(DELETE_APPLY_USE_CASE)
    private readonly deleteApplyUseCase: DeleteApplyUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Delete apply',
    description: 'Deletes an existing apply by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'Apply identifier.' })
  @ApiNoContentResponse({
    description: 'Apply deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Apply not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteApplyUseCase.execute(id);
  }
}
