import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  DELETE_COMPANY_USE_CASE,
  type DeleteCompanyUseCaseInterface,
} from '@src/company/applications/contracts/delete-company.use-case-interface';

@ApiTags('Company')
@Controller('company')
export class DeleteCompanyController {
  constructor(
    @Inject(DELETE_COMPANY_USE_CASE)
    private readonly deleteCompanyUseCase: DeleteCompanyUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Delete company',
    description: 'Deletes an existing company by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'Company identifier.' })
  @ApiNoContentResponse({
    description: 'Company deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteCompanyUseCase.execute(id);
  }
}
