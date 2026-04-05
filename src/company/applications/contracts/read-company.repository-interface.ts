import type { CompanyRecord } from './company-record.interface';

export const READ_COMPANY_REPOSITORY = 'READ_COMPANY_REPOSITORY';

export interface ReadCompanyRepositoryInterface {
  findById(id: string): Promise<CompanyRecord | null>;
}
