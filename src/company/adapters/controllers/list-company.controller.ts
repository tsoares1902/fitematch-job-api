import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListCompanyResponseDto } from '@src/company/adapters/dto/responses/list-company.response.dto';
import {
  LIST_COMPANY_USE_CASE_INTERFACE,
  type ListCompanyUseCaseInterface,
} from '@src/company/applications/contracts/list-company.use-case-interface';
import { CompanyResponseMapper } from '@src/company/adapters/controllers/responses/company-response.mapper';

@ApiTags('Company')
@Controller('company')
export class ListCompanyController {
  constructor(
    @Inject(LIST_COMPANY_USE_CASE_INTERFACE)
    private readonly listCompanyUseCase: ListCompanyUseCaseInterface,
    private readonly companyResponseMapper: CompanyResponseMapper,
  ) {}

  @ApiOperation({
    summary: 'List companies',
    description: 'Returns the list of registered companies.',
  })
  @ApiOkResponse({
    description: 'Companies listed successfully.',
    type: ListCompanyResponseDto,
    isArray: true,
  })
  @Get()
  async list(): Promise<ListCompanyResponseDto[]> {
    return this.companyResponseMapper.toListResponse(
      await this.listCompanyUseCase.execute(),
    );
  }
}
