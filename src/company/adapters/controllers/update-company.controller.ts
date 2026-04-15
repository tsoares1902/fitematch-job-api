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
import { UpdateCompanyResponseDto } from '@src/company/adapters/dto/responses/update-company.response.dto';
import { UpdateCompanyDto } from '@src/company/adapters/dto/update-company.dto';
import {
  UPDATE_COMPANY_USE_CASE_INTERFACE,
  type UpdateCompanyUseCaseInterface,
} from '@src/company/applications/contracts/update-company.use-case-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

@ApiTags('Company')
@Controller('company')
export class UpdateCompanyController {
  constructor(
    @Inject(UPDATE_COMPANY_USE_CASE_INTERFACE)
    private readonly updateCompanyUseCase: UpdateCompanyUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Update company',
    description: 'Updates an existing company by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'Company identifier.' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiOkResponse({
    description: 'Company updated successfully.',
    type: UpdateCompanyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiNotFoundResponse({
    description: 'Company not found!',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCompanyDto,
  ): Promise<CompanyRecord> {
    return this.updateCompanyUseCase.execute(id, data);
  }
}
