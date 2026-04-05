import type { CompanyRecord } from './company-record.interface';

export const READ_COMPANY_USE_CASE = 'READ_COMPANY_USE_CASE';

export interface ReadCompanyUseCaseInterface {
  execute(id: string): Promise<CompanyRecord>;
}
