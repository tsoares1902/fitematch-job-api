import type { Company } from './company.interface';
import type { CompanyRecord } from './company-record.interface';

export const UPDATE_COMPANY_USE_CASE = 'UPDATE_COMPANY_USE_CASE';

export interface UpdateCompanyUseCaseInterface {
  execute(id: string, data: Partial<Company>): Promise<CompanyRecord>;
}
