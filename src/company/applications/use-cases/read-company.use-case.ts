import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  READ_COMPANY_REPOSITORY,
  type ReadCompanyRepositoryInterface,
} from '@src/company/applications/contracts/read-company.repository-interface';
import type { ReadCompanyUseCaseInterface } from '@src/company/applications/contracts/read-company.use-case-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

@Injectable()
export class ReadCompanyUseCase implements ReadCompanyUseCaseInterface {
  constructor(
    @Inject(READ_COMPANY_REPOSITORY)
    private readonly readCompanyRepository: ReadCompanyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<CompanyRecord> {
    const company = await this.readCompanyRepository.findById(id);

    if (!company) {
      throw new NotFoundException('Company not found!');
    }

    return company;
  }
}
