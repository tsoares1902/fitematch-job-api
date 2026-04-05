import { Inject, Injectable } from '@nestjs/common';
import {
  LIST_APPLY_REPOSITORY,
  type ListApplyRepositoryInterface,
} from '@src/apply/applications/contracts/list-apply.repository-interface';
import type { ListApplyUseCaseInterface } from '@src/apply/applications/contracts/list-apply.use-case-interface';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

@Injectable()
export class ListApplyUseCase implements ListApplyUseCaseInterface {
  constructor(
    @Inject(LIST_APPLY_REPOSITORY)
    private readonly listApplyRepository: ListApplyRepositoryInterface,
  ) {}

  async execute(): Promise<ApplyRecord[]> {
    return this.listApplyRepository.list();
  }
}
