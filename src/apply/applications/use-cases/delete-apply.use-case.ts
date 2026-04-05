import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  DELETE_APPLY_REPOSITORY,
  type DeleteApplyRepositoryInterface,
} from '@src/apply/applications/contracts/delete-apply.repository-interface';
import type { DeleteApplyUseCaseInterface } from '@src/apply/applications/contracts/delete-apply.use-case-interface';

@Injectable()
export class DeleteApplyUseCase implements DeleteApplyUseCaseInterface {
  constructor(
    @Inject(DELETE_APPLY_REPOSITORY)
    private readonly deleteApplyRepository: DeleteApplyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.deleteApplyRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('Apply not found!');
    }

    return true;
  }
}
