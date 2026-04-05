import type { CompanyRoleEnum } from './company-role.enum';
import type { CompanyStatusEnum } from './company-status.enum';

export interface Company {
  slug: string;
  name: string;
  role?: CompanyRoleEnum;
  logo?: string | null;
  cover?: string | null;
  status?: CompanyStatusEnum;
}
