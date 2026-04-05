import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

export const LIST_COMPANY_USE_CASE = 'LIST_COMPANY_USE_CASE';

export interface ListCompanyUseCaseInterface {
  execute(): Promise<CompanyRecord[]>;
}
