import type { CompanyRoleEnum } from './company-role.enum';
import type { CompanyStatusEnum } from './company-status.enum';

export interface CompanyRecord {
  id: string;
  slug: string;
  name: string;
  role: CompanyRoleEnum;
  logo?: string;
  logoAlt?: string;
  status: CompanyStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
