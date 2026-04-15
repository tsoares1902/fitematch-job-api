import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  READ_APPLY_REPOSITORY_INTERFACE,
  type ReadApplyRepositoryInterface,
} from '@src/apply/applications/contracts/read-apply.repository-interface';
import type { ReadApplyUseCaseInterface } from '@src/apply/applications/contracts/read-apply.use-case-interface';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

@Injectable()
export class ReadApplyUseCase implements ReadApplyUseCaseInterface {
  constructor(
    @Inject(READ_APPLY_REPOSITORY_INTERFACE)
    private readonly readApplyRepository: ReadApplyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<ApplyRecord> {
    const apply = await this.readApplyRepository.findById(id);

    if (!apply) {
      throw new NotFoundException('Apply not found!');
    }

    return apply;
  }
}
