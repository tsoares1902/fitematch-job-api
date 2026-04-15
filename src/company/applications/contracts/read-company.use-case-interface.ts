import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

export const READ_COMPANY_USE_CASE_INTERFACE =
  'READ_COMPANY_USE_CASE_INTERFACE';

export interface ReadCompanyUseCaseInterface {
  execute(id: string): Promise<CompanyRecord>;
}
