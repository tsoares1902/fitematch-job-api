import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UPDATE_COMPANY_REPOSITORY,
  type UpdateCompanyRepositoryInterface,
} from '@src/company/applications/contracts/update-company.repository-interface';
import type { UpdateCompanyUseCaseInterface } from '@src/company/applications/contracts/update-company.use-case-interface';
import type { Company } from '@src/company/applications/contracts/company.interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

@Injectable()
export class UpdateCompanyUseCase implements UpdateCompanyUseCaseInterface {
  constructor(
    @Inject(UPDATE_COMPANY_REPOSITORY)
    private readonly updateCompanyRepository: UpdateCompanyRepositoryInterface,
  ) {}

  async execute(id: string, data: Partial<Company>): Promise<CompanyRecord> {
    const company = await this.updateCompanyRepository.update(id, data);

    if (!company) {
      throw new NotFoundException('Company not found!');
    }

    return company;
  }
}
