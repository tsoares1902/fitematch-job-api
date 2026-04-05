import type { Company } from './company.interface';
import type { CompanyRecord } from './company-record.interface';

export const CREATE_COMPANY_USE_CASE = 'CREATE_COMPANY_USE_CASE';

export interface CreateCompanyUseCaseInterface {
  execute(data: Company): Promise<CompanyRecord>;
}
