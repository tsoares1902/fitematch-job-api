import type { Company } from './company.interface';
import type { CompanyRecord } from './company-record.interface';

export const CREATE_COMPANY_REPOSITORY = 'CREATE_USER_REPOSITORY';

export interface CreateCompanyRepositoryInterface {
  create(data: Company): Promise<CompanyRecord>;
}
