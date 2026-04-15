import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateApplyDto } from '@src/apply/adapters/dto/create-apply.dto';
import { CreateApplyResponseDto } from '@src/apply/adapters/dto/responses/create-apply.response.dto';
import {
  CREATE_APPLY_USE_CASE_INTERFACE,
  type CreateApplyUseCaseInterface,
} from '@src/apply/applications/contracts/create-apply.use-case-interface';
import { ApplyResponseMapper } from '@src/apply/adapters/controllers/responses/apply-response.mapper';

@ApiTags('Apply')
@Controller('apply')
export class CreateApplyController {
  constructor(
    @Inject(CREATE_APPLY_USE_CASE_INTERFACE)
    private readonly createApplyUseCase: CreateApplyUseCaseInterface,
    private readonly applyResponseMapper: ApplyResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'Create job application.',
    description: 'Creates a new job application.',
  })
  @ApiBody({ type: CreateApplyDto })
  @ApiCreatedResponse({
    description: 'Job application created successfully.',
    type: CreateApplyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @Post()
  async create(@Body() data: CreateApplyDto): Promise<CreateApplyResponseDto> {
    return this.applyResponseMapper.toResponse(
      await this.createApplyUseCase.execute(data),
    );
  }
}
