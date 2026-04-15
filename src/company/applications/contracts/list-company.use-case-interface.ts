import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

export const LIST_COMPANY_USE_CASE_INTERFACE =
  'LIST_COMPANY_USE_CASE_INTERFACE';

export interface ListCompanyUseCaseInterface {
  execute(): Promise<CompanyRecord[]>;
}
