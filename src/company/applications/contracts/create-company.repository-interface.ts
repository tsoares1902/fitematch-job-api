import type { Company } from '@src/company/applications/contracts/company.interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

export const CREATE_COMPANY_REPOSITORY_INTERFACE =
  'CREATE_COMPANY_REPOSITORY_INTERFACE';

export interface CreateCompanyRepositoryInterface {
  create(data: Company): Promise<CompanyRecord>;
}
