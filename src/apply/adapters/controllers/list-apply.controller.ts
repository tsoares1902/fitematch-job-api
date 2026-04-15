import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListApplyResponseDto } from '@src/apply/adapters/dto/responses/list-apply.response.dto';
import {
  LIST_APPLY_USE_CASE_INTERFACE,
  type ListApplyUseCaseInterface,
} from '@src/apply/applications/contracts/list-apply.use-case-interface';
import { ApplyResponseMapper } from '@src/apply/adapters/controllers/responses/apply-response.mapper';

@ApiTags('Apply')
@Controller('apply')
export class ListApplyController {
  constructor(
    @Inject(LIST_APPLY_USE_CASE_INTERFACE)
    private readonly listApplyUseCase: ListApplyUseCaseInterface,
    private readonly applyResponseMapper: ApplyResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'List applies',
    description: 'Returns the list of registered applies.',
  })
  @ApiOkResponse({
    description: 'Applies listed successfully.',
    type: ListApplyResponseDto,
    isArray: true,
  })
  @Get()
  async list(): Promise<ListApplyResponseDto[]> {
    return this.applyResponseMapper.toListResponse(
      await this.listApplyUseCase.execute(),
    );
  }
}
