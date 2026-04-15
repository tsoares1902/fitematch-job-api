import { Injectable, Inject } from '@nestjs/common';
import {
  LIST_COMPANY_REPOSITORY_INTERFACE,
  type ListCompanyRepositoryInterface,
} from '@src/company/applications/contracts/list-company.repository-interface';
import {
  READ_COMPANY_REPOSITORY_INTERFACE,
  type ReadCompanyRepositoryInterface,
} from '@src/company/applications/contracts/read-company.repository-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';
import type {
  CompanyReaderPort,
  JobCompanySnapshot,
} from '@src/job/applications/contracts/company-reader.port';

@Injectable()
export class CompanyReaderGateway implements CompanyReaderPort {
  constructor(
    @Inject(READ_COMPANY_REPOSITORY_INTERFACE)
    private readonly readCompanyRepository: ReadCompanyRepositoryInterface,
    @Inject(LIST_COMPANY_REPOSITORY_INTERFACE)
    private readonly listCompanyRepository: ListCompanyRepositoryInterface,
  ) {}

  async findById(id: string): Promise<JobCompanySnapshot | null> {
    const company = await this.readCompanyRepository.findById(id);

    return company ? this.toSnapshot(company) : null;
  }

  async list(): Promise<JobCompanySnapshot[]> {
    const companies = await this.listCompanyRepository.list();

    return companies.map((company) => this.toSnapshot(company));
  }

  private toSnapshot(company: CompanyRecord): JobCompanySnapshot {
    return {
      id: company.id,
      slug: company.slug,
      name: company.name,
      address: company.address,
      social: company.social ?? {},
      role: company.role,
      logo: company.logo ?? '',
      cover: company.cover ?? '',
      status: company.status,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
