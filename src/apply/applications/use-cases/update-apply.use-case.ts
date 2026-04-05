import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UPDATE_APPLY_REPOSITORY,
  type UpdateApplyRepositoryInterface,
} from '@src/apply/applications/contracts/update-apply.repository-interface';
import type { UpdateApplyUseCaseInterface } from '@src/apply/applications/contracts/update-apply.use-case-interface';
import type { Apply } from '@src/apply/applications/contracts/apply.interface';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

@Injectable()
export class UpdateApplyUseCase implements UpdateApplyUseCaseInterface {
  constructor(
    @Inject(UPDATE_APPLY_REPOSITORY)
    private readonly updateApplyRepository: UpdateApplyRepositoryInterface,
  ) {}

  async execute(id: string, data: Partial<Apply>): Promise<ApplyRecord> {
    const apply = await this.updateApplyRepository.update(id, data);

    if (!apply) {
      throw new NotFoundException('Apply not found!');
    }

    return apply;
  }
}
