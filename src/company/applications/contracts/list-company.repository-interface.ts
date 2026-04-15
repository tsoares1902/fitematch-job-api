import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

export const LIST_COMPANY_REPOSITORY_INTERFACE =
  'LIST_COMPANY_REPOSITORY_INTERFACE';

export interface ListCompanyRepositoryInterface {
  list(): Promise<CompanyRecord[]>;
}
