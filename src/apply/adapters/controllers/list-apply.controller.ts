import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListApplyResponseDto } from '@src/apply/adapters/dto/responses/list-apply.response.dto';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';
import {
  LIST_APPLY_USE_CASE_INTERFACE,
  type ListApplyUseCaseInterface,
} from '@src/apply/applications/contracts/list-apply.use-case-interface';

@ApiTags('Apply')
@Controller('apply')
export class ListApplyController {
  constructor(
    @Inject(LIST_APPLY_USE_CASE_INTERFACE)
    private readonly listApplyUseCase: ListApplyUseCaseInterface,
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
  async list(): Promise<ApplyRecord[]> {
    return this.listApplyUseCase.execute();
  }
}
