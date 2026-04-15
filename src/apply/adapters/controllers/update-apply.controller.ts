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
import { UpdateApplyDto } from '@src/apply/adapters/dto/update-apply.dto';
import { UpdateApplyResponseDto } from '@src/apply/adapters/dto/responses/update-apply.response.dto';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';
import {
  UPDATE_APPLY_USE_CASE_INTERFACE,
  type UpdateApplyUseCaseInterface,
} from '@src/apply/applications/contracts/update-apply.use-case-interface';

@ApiTags('Apply')
@Controller('apply')
export class UpdateApplyController {
  constructor(
    @Inject(UPDATE_APPLY_USE_CASE_INTERFACE)
    private readonly updateApplyUseCase: UpdateApplyUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Update apply',
    description: 'Updates an existing apply by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'Apply identifier.' })
  @ApiBody({ type: UpdateApplyDto })
  @ApiOkResponse({
    description: 'Apply updated successfully.',
    type: UpdateApplyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiNotFoundResponse({
    description: 'Apply not found!',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateApplyDto,
  ): Promise<ApplyRecord> {
    return this.updateApplyUseCase.execute(id, data);
  }
}
