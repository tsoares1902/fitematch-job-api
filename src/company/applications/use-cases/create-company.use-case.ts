import { Inject, Injectable } from '@nestjs/common';
import {
  CREATE_COMPANY_REPOSITORY_INTERFACE,
  type CreateCompanyRepositoryInterface,
} from '@src/company/applications/contracts/create-company.repository-interface';
import type { CreateCompanyUseCaseInterface } from '@src/company/applications/contracts/create-company.use-case-interface';
import type { Company } from '@src/company/applications/contracts/company.interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

@Injectable()
export class CreateCompanyUseCase implements CreateCompanyUseCaseInterface {
  constructor(
    @Inject(CREATE_COMPANY_REPOSITORY_INTERFACE)
    private readonly createCompanyRepository: CreateCompanyRepositoryInterface,
  ) {}

  async execute(data: Company): Promise<CompanyRecord> {
    return this.createCompanyRepository.create({
      ...data,
    });
  }
}
