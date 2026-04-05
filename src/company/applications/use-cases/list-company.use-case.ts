import { Inject, Injectable } from '@nestjs/common';
import {
  LIST_COMPANY_REPOSITORY,
  type ListCompanyRepositoryInterface,
} from '@src/company/applications/contracts/list-company.repository-interface';
import type { ListCompanyUseCaseInterface } from '@src/company/applications/contracts/list-company.use-case-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

@Injectable()
export class ListCompanyUseCase implements ListCompanyUseCaseInterface {
  constructor(
    @Inject(LIST_COMPANY_REPOSITORY)
    private readonly listCompanyRepository: ListCompanyRepositoryInterface,
  ) {}

  async execute(): Promise<CompanyRecord[]> {
    return this.listCompanyRepository.list();
  }
}
