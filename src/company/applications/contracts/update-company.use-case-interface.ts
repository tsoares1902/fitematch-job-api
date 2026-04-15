import type { Company } from '@src/company/applications/contracts/company.interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

export const UPDATE_COMPANY_USE_CASE_INTERFACE =
  'UPDATE_COMPANY_USE_CASE_INTERFACE';

export interface UpdateCompanyUseCaseInterface {
  execute(id: string, data: Partial<Company>): Promise<CompanyRecord>;
}
