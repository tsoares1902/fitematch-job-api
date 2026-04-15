import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReadApplyResponseDto } from '@src/apply/adapters/dto/responses/read-apply.response.dto';
import {
  READ_APPLY_USE_CASE_INTERFACE,
  type ReadApplyUseCaseInterface,
} from '@src/apply/applications/contracts/read-apply.use-case-interface';
import { ApplyResponseMapper } from '@src/apply/adapters/controllers/responses/apply-response.mapper';

@ApiTags('Apply')
@Controller('apply')
export class ReadApplyController {
  constructor(
    @Inject(READ_APPLY_USE_CASE_INTERFACE)
    private readonly readApplyUseCase: ReadApplyUseCaseInterface,
    private readonly applyResponseMapper: ApplyResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'Get apply by id',
    description: 'Returns an apply by the provided identifier.',
  })
  @ApiParam({ name: 'id', description: 'Apply identifier.' })
  @ApiOkResponse({
    description: 'Apply found successfully.',
    type: ReadApplyResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Apply not found!',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ReadApplyResponseDto> {
    return this.applyResponseMapper.toResponse(
      await this.readApplyUseCase.execute(id),
    );
  }
}
