import type {
  CompanyAddress,
  CompanySocial,
} from '@src/company/domain/entities/company.entity';
import type { CompanyRoleEnum } from '@src/company/domain/enums/company-role.enum';
import type { CompanyStatusEnum } from '@src/company/domain/enums/company-status.enum';

export interface CompanyRecord {
  id: string;
  slug: string;
  name: string;
  address: CompanyAddress;
  social: CompanySocial;
  role: CompanyRoleEnum;
  logo?: string | null;
  cover?: string | null;
  status: CompanyStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
