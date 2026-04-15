import { ApplyRepository } from '@src/apply/infrastructure/persistence/mongoose/repositories/apply.repository';

import { ListApplyUseCase } from '@src/apply/applications/use-cases/list-apply.use-case';
import { CreateApplyUseCase } from '@src/apply/applications/use-cases/create-apply.use-case';
import { ReadApplyUseCase } from '@src/apply/applications/use-cases/read-apply.use-case';
import { UpdateApplyUseCase } from '@src/apply/applications/use-cases/update-apply.use-case';
import { DeleteApplyUseCase } from '@src/apply/applications/use-cases/delete-apply.use-case';
import { ApplyResponseMapper } from '@src/apply/adapters/controllers/responses/apply-response.mapper';
import { LIST_APPLY_REPOSITORY_INTERFACE } from '@src/apply/applications/contracts/list-apply.repository-interface';
import { CREATE_APPLY_REPOSITORY_INTERFACE } from '@src/apply/applications/contracts/create-apply.repository-interface';
import { READ_APPLY_REPOSITORY_INTERFACE } from '@src/apply/applications/contracts/read-apply.repository-interface';
import { UPDATE_APPLY_REPOSITORY_INTERFACE } from '@src/apply/applications/contracts/update-apply.repository-interface';
import { DELETE_APPLY_REPOSITORY_INTERFACE } from '@src/apply/applications/contracts/delete-apply.repository-interface';
import { LIST_APPLY_USE_CASE_INTERFACE } from '@src/apply/applications/contracts/list-apply.use-case-interface';
import { CREATE_APPLY_USE_CASE_INTERFACE } from '@src/apply/applications/contracts/create-apply.use-case-interface';
import { READ_APPLY_USE_CASE_INTERFACE } from '@src/apply/applications/contracts/read-apply.use-case-interface';
import { UPDATE_APPLY_USE_CASE_INTERFACE } from '@src/apply/applications/contracts/update-apply.use-case-interface';
import { DELETE_APPLY_USE_CASE_INTERFACE } from '@src/apply/applications/contracts/delete-apply.use-case-interface';
import type { ListApplyRepositoryInterface } from '@src/apply/applications/contracts/list-apply.repository-interface';
import type { CreateApplyRepositoryInterface } from '@src/apply/applications/contracts/create-apply.repository-interface';
import type { ReadApplyRepositoryInterface } from '@src/apply/applications/contracts/read-apply.repository-interface';
import type { UpdateApplyRepositoryInterface } from '@src/apply/applications/contracts/update-apply.repository-interface';
import type { DeleteApplyRepositoryInterface } from '@src/apply/applications/contracts/delete-apply.repository-interface';
import {
  providePort,
  provideUseCase,
} from '@src/shared/infrastructure/di/provider.utils';

export const applyProviders = [
  ApplyResponseMapper,
  providePort(LIST_APPLY_REPOSITORY_INTERFACE, ApplyRepository),
  providePort(CREATE_APPLY_REPOSITORY_INTERFACE, ApplyRepository),
  providePort(READ_APPLY_REPOSITORY_INTERFACE, ApplyRepository),
  providePort(UPDATE_APPLY_REPOSITORY_INTERFACE, ApplyRepository),
  providePort(DELETE_APPLY_REPOSITORY_INTERFACE, ApplyRepository),
  provideUseCase(
    LIST_APPLY_USE_CASE_INTERFACE,
    [LIST_APPLY_REPOSITORY_INTERFACE],
    (repository: ListApplyRepositoryInterface) =>
      new ListApplyUseCase(repository),
  ),
  provideUseCase(
    CREATE_APPLY_USE_CASE_INTERFACE,
    [CREATE_APPLY_REPOSITORY_INTERFACE],
    (repository: CreateApplyRepositoryInterface) =>
      new CreateApplyUseCase(repository),
  ),
  provideUseCase(
    READ_APPLY_USE_CASE_INTERFACE,
    [READ_APPLY_REPOSITORY_INTERFACE],
    (repository: ReadApplyRepositoryInterface) =>
      new ReadApplyUseCase(repository),
  ),
  provideUseCase(
    UPDATE_APPLY_USE_CASE_INTERFACE,
    [UPDATE_APPLY_REPOSITORY_INTERFACE],
    (repository: UpdateApplyRepositoryInterface) =>
      new UpdateApplyUseCase(repository),
  ),
  provideUseCase(
    DELETE_APPLY_USE_CASE_INTERFACE,
    [DELETE_APPLY_REPOSITORY_INTERFACE],
    (repository: DeleteApplyRepositoryInterface) =>
      new DeleteApplyUseCase(repository),
  ),
];
