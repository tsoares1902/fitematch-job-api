import { type UpdateApplyRepositoryInterface } from '@src/apply/applications/contracts/update-apply.repository-interface';
import type { UpdateApplyUseCaseInterface } from '@src/apply/applications/contracts/update-apply.use-case-interface';
import {
  ApplyEntity,
  type Apply,
} from '@src/apply/domain/entities/apply.entity';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class UpdateApplyUseCase implements UpdateApplyUseCaseInterface {
  constructor(
    private readonly updateApplyRepository: UpdateApplyRepositoryInterface,
  ) {}

  async execute(id: string, data: Partial<Apply>): Promise<ApplyRecord> {
    const apply = await this.updateApplyRepository.update(
      id,
      ApplyEntity.normalizeUpdate(data),
    );

    if (!apply) {
      throw new NotFoundApplicationError('Apply not found!');
    }

    return apply;
  }
}
