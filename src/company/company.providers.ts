import { CompanyRepository } from '@src/company/adapters/repositories/company.repository';
import { ListCompanyUseCase } from '@src/company/applications/use-cases/list-company.use-case';
import { CreateCompanyUseCase } from '@src/company/applications/use-cases/create-company.use-case';
import { ReadCompanyUseCase } from '@src/company/applications/use-cases/read-company.use-case';
import { UpdateCompanyUseCase } from '@src/company/applications/use-cases/update-company.use-case';
import { DeleteCompanyUseCase } from '@src/company/applications/use-cases/delete-company.use-case';
import { LIST_COMPANY_REPOSITORY_INTERFACE } from '@src/company/applications/contracts/list-company.repository-interface';
import { CREATE_COMPANY_REPOSITORY_INTERFACE } from '@src/company/applications/contracts/create-company.repository-interface';
import { READ_COMPANY_REPOSITORY_INTERFACE } from '@src/company/applications/contracts/read-company.repository-interface';
import { UPDATE_COMPANY_REPOSITORY_INTERFACE } from '@src/company/applications/contracts/update-company.repository-interface';
import { DELETE_COMPANY_REPOSITORY_INTERFACE } from '@src/company/applications/contracts/delete-company.repository-interface';
import { LIST_COMPANY_USE_CASE_INTERFACE } from '@src/company/applications/contracts/list-company.use-case-interface';
import { CREATE_COMPANY_USE_CASE_INTERFACE } from '@src/company/applications/contracts/create-company.use-case-interface';
import { READ_COMPANY_USE_CASE_INTERFACE } from '@src/company/applications/contracts/read-company.use-case-interface';
import { UPDATE_COMPANY_USE_CASE_INTERFACE } from '@src/company/applications/contracts/update-company.use-case-interface';
import { DELETE_COMPANY_USE_CASE_INTERFACE } from '@src/company/applications/contracts/delete-company.use-case-interface';

export const companyProviders = [
  {
    provide: LIST_COMPANY_REPOSITORY_INTERFACE,
    useClass: CompanyRepository,
  },
  {
    provide: CREATE_COMPANY_REPOSITORY_INTERFACE,
    useClass: CompanyRepository,
  },
  {
    provide: READ_COMPANY_REPOSITORY_INTERFACE,
    useClass: CompanyRepository,
  },
  {
    provide: UPDATE_COMPANY_REPOSITORY_INTERFACE,
    useClass: CompanyRepository,
  },
  {
    provide: DELETE_COMPANY_REPOSITORY_INTERFACE,
    useClass: CompanyRepository,
  },
  {
    provide: LIST_COMPANY_USE_CASE_INTERFACE,
    useClass: ListCompanyUseCase,
  },
  {
    provide: CREATE_COMPANY_USE_CASE_INTERFACE,
    useClass: CreateCompanyUseCase,
  },
  {
    provide: READ_COMPANY_USE_CASE_INTERFACE,
    useClass: ReadCompanyUseCase,
  },
  {
    provide: UPDATE_COMPANY_USE_CASE_INTERFACE,
    useClass: UpdateCompanyUseCase,
  },
  {
    provide: DELETE_COMPANY_USE_CASE_INTERFACE,
    useClass: DeleteCompanyUseCase,
  },
];
