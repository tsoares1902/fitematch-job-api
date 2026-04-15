import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReadCompanyResponseDto } from '@src/company/adapters/dto/responses/read-company.response.dto';
import {
  READ_COMPANY_USE_CASE_INTERFACE,
  type ReadCompanyUseCaseInterface,
} from '@src/company/applications/contracts/read-company.use-case-interface';
import { CompanyResponseMapper } from '@src/company/adapters/controllers/responses/company-response.mapper';

@ApiTags('Company')
@Controller('company')
export class ReadCompanyController {
  constructor(
    @Inject(READ_COMPANY_USE_CASE_INTERFACE)
    private readonly readCompanyUseCase: ReadCompanyUseCaseInterface,
    private readonly companyResponseMapper: CompanyResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'Get company by id',
    description: 'Returns a company by the provided identifier.',
  })
  @ApiParam({ name: 'id', description: 'Company identifier.' })
  @ApiOkResponse({
    description: 'Company found successfully.',
    type: ReadCompanyResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Company not found!',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ReadCompanyResponseDto> {
    return this.companyResponseMapper.toResponse(
      await this.readCompanyUseCase.execute(id),
    );
  }
}
