export const COMPANY_READER_PORT = 'COMPANY_READER_PORT';

export interface JobCompanyAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface JobCompanySocial {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface JobCompanySnapshot {
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

export interface CompanyReaderPort {
  findById(id: string): Promise<JobCompanySnapshot | null>;
  list(): Promise<JobCompanySnapshot[]>;
}
