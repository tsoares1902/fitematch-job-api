import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

export const READ_COMPANY_REPOSITORY_INTERFACE =
  'READ_COMPANY_REPOSITORY_INTERFACE';

export interface ReadCompanyRepositoryInterface {
  findById(id: string): Promise<CompanyRecord | null>;
}
