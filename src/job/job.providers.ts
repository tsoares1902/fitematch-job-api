import { JobRepository } from '@src/job/infrastructure/persistence/mongoose/repositories/job.repository';
import { ListJobUseCase } from '@src/job/applications/use-cases/list-job.use-case';
import { CreateJobUseCase } from '@src/job/applications/use-cases/create-job.use-case';
import { ReadJobUseCase } from '@src/job/applications/use-cases/read-job.use-case';
import { UpdateJobUseCase } from '@src/job/applications/use-cases/update-job.use-case';
import { DeleteJobUseCase } from '@src/job/applications/use-cases/delete-job.use-case';
import { LIST_JOB_REPOSITORY_INTERFACE } from '@src/job/applications/contracts/list-job.repository-interface';
import { CREATE_JOB_REPOSITORY_INTERFACE } from '@src/job/applications/contracts/create-job.repository-interface';
import { READ_JOB_REPOSITORY_INTERFACE } from '@src/job/applications/contracts/read-job.repository-interface';
import { UPDATE_JOB_REPOSITORY } from '@src/job/applications/contracts/update-job.repository-interface';
import { DELETE_JOB_REPOSITORY_INTERFACE } from '@src/job/applications/contracts/delete-job.repository-interface';
import { LIST_JOB_USE_CASE_INTERFACE } from '@src/job/applications/contracts/list-job.use-case-interface';
import { CREATE_JOB_USE_CASE_INTERFACE } from '@src/job/applications/contracts/create-job.use-case-interface';
import { READ_JOB_USE_CASE_INTERFACE } from '@src/job/applications/contracts/read-job.use-case-interface';
import { UPDATE_JOB_USE_CASE_INTERFACE } from '@src/job/applications/contracts/update-job.use-case-interface';
import { DELETE_JOB_USE_CASE_INTERFACE } from '@src/job/applications/contracts/delete-job.use-case-interface';
import { JobResponseMapper } from '@src/job/adapters/controllers/responses/job-response.mapper';
import {
  COMPANY_READER_PORT,
  type CompanyReaderPort,
} from '@src/job/applications/contracts/company-reader.port';
import { CompanyReaderGateway } from '@src/job/infrastructure/gateways/company-reader.gateway';
import { HttpPaginationMapper } from '@src/shared/presentation/http/pagination/http-pagination.mapper';
import type { ListJobRepositoryInterface } from '@src/job/applications/contracts/list-job.repository-interface';
import type { CreateJobRepositoryInterface } from '@src/job/applications/contracts/create-job.repository-interface';
import type { ReadJobRepositoryInterface } from '@src/job/applications/contracts/read-job.repository-interface';
import type { UpdateJobRepositoryInterface } from '@src/job/applications/contracts/update-job.repository-interface';
import type { DeleteJobRepositoryInterface } from '@src/job/applications/contracts/delete-job.repository-interface';
import {
  providePort,
  provideUseCase,
} from '@src/shared/infrastructure/di/provider.utils';

export const jobProviders = [
  HttpPaginationMapper,
  JobResponseMapper,
  providePort(COMPANY_READER_PORT, CompanyReaderGateway),
  providePort(LIST_JOB_REPOSITORY_INTERFACE, JobRepository),
  providePort(CREATE_JOB_REPOSITORY_INTERFACE, JobRepository),
  providePort(READ_JOB_REPOSITORY_INTERFACE, JobRepository),
  providePort(UPDATE_JOB_REPOSITORY, JobRepository),
  providePort(DELETE_JOB_REPOSITORY_INTERFACE, JobRepository),
  provideUseCase(
    LIST_JOB_USE_CASE_INTERFACE,
    [LIST_JOB_REPOSITORY_INTERFACE, COMPANY_READER_PORT],
    (
      repository: ListJobRepositoryInterface,
      companyReader: CompanyReaderPort,
    ) => new ListJobUseCase(repository, companyReader),
  ),
  provideUseCase(
    CREATE_JOB_USE_CASE_INTERFACE,
    [CREATE_JOB_REPOSITORY_INTERFACE, COMPANY_READER_PORT],
    (
      repository: CreateJobRepositoryInterface,
      companyReader: CompanyReaderPort,
    ) => new CreateJobUseCase(repository, companyReader),
  ),
  provideUseCase(
    READ_JOB_USE_CASE_INTERFACE,
    [READ_JOB_REPOSITORY_INTERFACE, COMPANY_READER_PORT],
    (
      repository: ReadJobRepositoryInterface,
      companyReader: CompanyReaderPort,
    ) => new ReadJobUseCase(repository, companyReader),
  ),
  provideUseCase(
    UPDATE_JOB_USE_CASE_INTERFACE,
    [UPDATE_JOB_REPOSITORY, COMPANY_READER_PORT],
    (
      repository: UpdateJobRepositoryInterface,
      companyReader: CompanyReaderPort,
    ) => new UpdateJobUseCase(repository, companyReader),
  ),
  provideUseCase(
    DELETE_JOB_USE_CASE_INTERFACE,
    [DELETE_JOB_REPOSITORY_INTERFACE],
    (repository: DeleteJobRepositoryInterface) =>
      new DeleteJobUseCase(repository),
  ),
];
