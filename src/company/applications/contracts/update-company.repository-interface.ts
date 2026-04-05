import type { Company } from './company.interface';
import type { CompanyRecord } from './company-record.interface';

export const UPDATE_COMPANY_REPOSITORY = 'UPDATE_COMPANY_REPOSITORY';

export interface UpdateCompanyRepositoryInterface {
  update(id: string, data: Partial<Company>): Promise<CompanyRecord | null>;
}
