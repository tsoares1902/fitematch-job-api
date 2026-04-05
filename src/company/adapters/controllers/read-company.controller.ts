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
  READ_COMPANY_USE_CASE,
  type ReadCompanyUseCaseInterface,
} from '@src/company/applications/contracts/read-company.use-case-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

@ApiTags('Company')
@Controller('company')
export class ReadCompanyController {
  constructor(
    @Inject(READ_COMPANY_USE_CASE)
    private readonly readCompanyUseCase: ReadCompanyUseCaseInterface,
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
  async getById(@Param('id') id: string): Promise<CompanyRecord> {
    return this.readCompanyUseCase.execute(id);
  }
}
