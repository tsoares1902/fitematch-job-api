import { type ReadCompanyRepositoryInterface } from '@src/company/applications/contracts/read-company.repository-interface';
import type { ReadCompanyUseCaseInterface } from '@src/company/applications/contracts/read-company.use-case-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class ReadCompanyUseCase implements ReadCompanyUseCaseInterface {
  constructor(
    private readonly readCompanyRepository: ReadCompanyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<CompanyRecord> {
    const company = await this.readCompanyRepository.findById(id);

    if (!company) {
      throw new NotFoundApplicationError('Company not found!');
    }

    return company;
  }
}
