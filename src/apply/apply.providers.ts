import { ApplyRepository } from '@src/apply/adapters/repositories/apply.repository';
import { CREATE_APPLY_REPOSITORY } from '@src/apply/applications/contracts/create-apply.repository-interface';
import { CREATE_APPLY_USE_CASE } from '@src/apply/applications/contracts/create-apply.use-case-interface';
import { DELETE_APPLY_REPOSITORY } from '@src/apply/applications/contracts/delete-apply.repository-interface';
import { DELETE_APPLY_USE_CASE } from '@src/apply/applications/contracts/delete-apply.use-case-interface';
import { LIST_APPLY_REPOSITORY } from '@src/apply/applications/contracts/list-apply.repository-interface';
import { LIST_APPLY_USE_CASE } from '@src/apply/applications/contracts/list-apply.use-case-interface';
import { READ_APPLY_REPOSITORY } from '@src/apply/applications/contracts/read-apply.repository-interface';
import { READ_APPLY_USE_CASE } from '@src/apply/applications/contracts/read-apply.use-case-interface';
import { UPDATE_APPLY_REPOSITORY } from '@src/apply/applications/contracts/update-apply.repository-interface';
import { UPDATE_APPLY_USE_CASE } from '@src/apply/applications/contracts/update-apply.use-case-interface';
import { CreateApplyUseCase } from '@src/apply/applications/use-cases/create-apply.use-case';
import { DeleteApplyUseCase } from '@src/apply/applications/use-cases/delete-apply.use-case';
import { ListApplyUseCase } from '@src/apply/applications/use-cases/list-apply.use-case';
import { ReadApplyUseCase } from '@src/apply/applications/use-cases/read-apply.use-case';
import { UpdateApplyUseCase } from '@src/apply/applications/use-cases/update-apply.use-case';

export const applyProviders = [
  {
    provide: LIST_APPLY_REPOSITORY,
    useClass: ApplyRepository,
  },
  {
    provide: CREATE_APPLY_REPOSITORY,
    useClass: ApplyRepository,
  },
  {
    provide: READ_APPLY_REPOSITORY,
    useClass: ApplyRepository,
  },
  {
    provide: UPDATE_APPLY_REPOSITORY,
    useClass: ApplyRepository,
  },
  {
    provide: DELETE_APPLY_REPOSITORY,
    useClass: ApplyRepository,
  },
  {
    provide: LIST_APPLY_USE_CASE,
    useClass: ListApplyUseCase,
  },
  {
    provide: CREATE_APPLY_USE_CASE,
    useClass: CreateApplyUseCase,
  },
  {
    provide: READ_APPLY_USE_CASE,
    useClass: ReadApplyUseCase,
  },
  {
    provide: UPDATE_APPLY_USE_CASE,
    useClass: UpdateApplyUseCase,
  },
  {
    provide: DELETE_APPLY_USE_CASE,
    useClass: DeleteApplyUseCase,
  },
];
