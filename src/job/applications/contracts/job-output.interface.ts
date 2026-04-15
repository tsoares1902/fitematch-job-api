import type {
  JobCompanyAddress,
  JobCompanySocial,
} from '@src/job/applications/contracts/company-reader.port';
import type { JobBenefits } from '@src/job/domain/entities/job.entity';
import type { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import type { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';

export interface JobCompanyOutput {
  id: string;
  slug: string;
  name: string;
  address: JobCompanyAddress;
  social: JobCompanySocial;
  role: string;
  logo: string;
  cover: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JobOutput {
  id: string;
  companyId: string;
  isPaidAdvertising?: boolean;
  slug: string;
  title: string;
  slots: number;
  cover: string;
  benefits: JobBenefits;
  role: JobRoleEnum;
  status: JobStatusEnum;
  company: JobCompanyOutput;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListJobsPaginationOutput {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ListJobsOutput {
  data: JobOutput[];
  pagination: ListJobsPaginationOutput;
}
