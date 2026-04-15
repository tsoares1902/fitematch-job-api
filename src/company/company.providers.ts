import { CompanyRepository } from '@src/company/infrastructure/persistence/mongoose/repositories/company.repository';
import { ListCompanyUseCase } from '@src/company/applications/use-cases/list-company.use-case';
import { CreateCompanyUseCase } from '@src/company/applications/use-cases/create-company.use-case';
import { ReadCompanyUseCase } from '@src/company/applications/use-cases/read-company.use-case';
import { UpdateCompanyUseCase } from '@src/company/applications/use-cases/update-company.use-case';
import { DeleteCompanyUseCase } from '@src/company/applications/use-cases/delete-company.use-case';
import { CompanyResponseMapper } from '@src/company/adapters/controllers/responses/company-response.mapper';
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
import type { ListCompanyRepositoryInterface } from '@src/company/applications/contracts/list-company.repository-interface';
import type { CreateCompanyRepositoryInterface } from '@src/company/applications/contracts/create-company.repository-interface';
import type { ReadCompanyRepositoryInterface } from '@src/company/applications/contracts/read-company.repository-interface';
import type { UpdateCompanyRepositoryInterface } from '@src/company/applications/contracts/update-company.repository-interface';
import type { DeleteCompanyRepositoryInterface } from '@src/company/applications/contracts/delete-company.repository-interface';
import {
  providePort,
  provideUseCase,
} from '@src/shared/infrastructure/di/provider.utils';

export const companyProviders = [
  CompanyResponseMapper,
  providePort(LIST_COMPANY_REPOSITORY_INTERFACE, CompanyRepository),
  providePort(CREATE_COMPANY_REPOSITORY_INTERFACE, CompanyRepository),
  providePort(READ_COMPANY_REPOSITORY_INTERFACE, CompanyRepository),
  providePort(UPDATE_COMPANY_REPOSITORY_INTERFACE, CompanyRepository),
  providePort(DELETE_COMPANY_REPOSITORY_INTERFACE, CompanyRepository),
  provideUseCase(
    LIST_COMPANY_USE_CASE_INTERFACE,
    [LIST_COMPANY_REPOSITORY_INTERFACE],
    (repository: ListCompanyRepositoryInterface) =>
      new ListCompanyUseCase(repository),
  ),
  provideUseCase(
    CREATE_COMPANY_USE_CASE_INTERFACE,
    [CREATE_COMPANY_REPOSITORY_INTERFACE],
    (repository: CreateCompanyRepositoryInterface) =>
      new CreateCompanyUseCase(repository),
  ),
  provideUseCase(
    READ_COMPANY_USE_CASE_INTERFACE,
    [READ_COMPANY_REPOSITORY_INTERFACE],
    (repository: ReadCompanyRepositoryInterface) =>
      new ReadCompanyUseCase(repository),
  ),
  provideUseCase(
    UPDATE_COMPANY_USE_CASE_INTERFACE,
    [UPDATE_COMPANY_REPOSITORY_INTERFACE],
    (repository: UpdateCompanyRepositoryInterface) =>
      new UpdateCompanyUseCase(repository),
  ),
  provideUseCase(
    DELETE_COMPANY_USE_CASE_INTERFACE,
    [DELETE_COMPANY_REPOSITORY_INTERFACE],
    (repository: DeleteCompanyRepositoryInterface) =>
      new DeleteCompanyUseCase(repository),
  ),
];
