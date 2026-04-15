import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCompanyDto } from '@src/company/adapters/dto/create-company.dto';
import { CreateCompanyResponseDto } from '@src/company/adapters/dto/responses/create-company.response.dto';
import {
  CREATE_COMPANY_USE_CASE_INTERFACE,
  type CreateCompanyUseCaseInterface,
} from '@src/company/applications/contracts/create-company.use-case-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

@ApiTags('Company')
@Controller('company')
export class CreateCompanyController {
  constructor(
    @Inject(CREATE_COMPANY_USE_CASE_INTERFACE)
    private readonly createCompanyUseCase: CreateCompanyUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Create company',
    description: 'Creates a new company.',
  })
  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedResponse({
    description: 'Company created successfully.',
    type: CreateCompanyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiConflictResponse({
    description: 'Company slug already exists.',
  })
  @Post()
  async create(@Body() data: CreateCompanyDto): Promise<CompanyRecord> {
    return this.createCompanyUseCase.execute(data);
  }
}
