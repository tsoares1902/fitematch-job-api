import ListJobResponse from '@src/job/adapters/controllers/responses/list-job-response';
import { JobRepository } from '@src/job/adapters/repositories/job.repository';
import { CREATE_JOB_REPOSITORY } from '@src/job/applications/contracts/create-job.repository-interface';
import { CREATE_JOB_USE_CASE } from '@src/job/applications/contracts/create-job.use-case-interface';
import { DELETE_JOB_REPOSITORY } from '@src/job/applications/contracts/delete-job.repository-interface';
import { DELETE_JOB_USE_CASE } from '@src/job/applications/contracts/delete-job.use-case-interface';
import { LIST_JOB_REPOSITORY_INTERFACE } from '@src/job/applications/contracts/list-job.repository-interface';
import { LIST_JOB_USE_CASE_INTERFACE } from '@src/job/applications/contracts/list-job.use-case-interface';
import { READ_JOB_REPOSITORY } from '@src/job/applications/contracts/read-job.repository-interface';
import { READ_JOB_USE_CASE } from '@src/job/applications/contracts/read-job.use-case-interface';
import { UPDATE_JOB_REPOSITORY } from '@src/job/applications/contracts/update-job.repository-interface';
import { UPDATE_JOB_USE_CASE } from '@src/job/applications/contracts/update-job.use-case-interface';
import { CreateJobUseCase } from '@src/job/applications/use-cases/create-job.use-case';
import { DeleteJobUseCase } from '@src/job/applications/use-cases/delete-job.use-case';
import { ListJobUseCase } from '@src/job/applications/use-cases/list-job.use-case';
import { ReadJobUseCase } from '@src/job/applications/use-cases/read-job.use-case';
import { UpdateJobUseCase } from '@src/job/applications/use-cases/update-job.use-case';
import MetadataUtils from '@src/shared/applications/utils/metadata.utils';

export const jobProviders = [
  MetadataUtils,
  ListJobResponse,
  {
    provide: LIST_JOB_REPOSITORY_INTERFACE,
    useClass: JobRepository,
  },
  {
    provide: CREATE_JOB_REPOSITORY,
    useClass: JobRepository,
  },
  {
    provide: READ_JOB_REPOSITORY,
    useClass: JobRepository,
  },
  {
    provide: UPDATE_JOB_REPOSITORY,
    useClass: JobRepository,
  },
  {
    provide: DELETE_JOB_REPOSITORY,
    useClass: JobRepository,
  },
  {
    provide: LIST_JOB_USE_CASE_INTERFACE,
    useClass: ListJobUseCase,
  },
  {
    provide: CREATE_JOB_USE_CASE,
    useClass: CreateJobUseCase,
  },
  {
    provide: READ_JOB_USE_CASE,
    useClass: ReadJobUseCase,
  },
  {
    provide: UPDATE_JOB_USE_CASE,
    useClass: UpdateJobUseCase,
  },
  {
    provide: DELETE_JOB_USE_CASE,
    useClass: DeleteJobUseCase,
  },
];
