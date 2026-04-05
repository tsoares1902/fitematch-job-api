import type { CompanyRecord } from './company-record.interface';

export const LIST_COMPANY_REPOSITORY = 'LIST_COMPANY_REPOSITORY';

export interface ListCompanyRepositoryInterface {
  list(): Promise<CompanyRecord[]>;
}
