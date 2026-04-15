import { type DeleteApplyRepositoryInterface } from '@src/apply/applications/contracts/delete-apply.repository-interface';
import type { DeleteApplyUseCaseInterface } from '@src/apply/applications/contracts/delete-apply.use-case-interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class DeleteApplyUseCase implements DeleteApplyUseCaseInterface {
  constructor(
    private readonly deleteApplyRepository: DeleteApplyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.deleteApplyRepository.delete(id);

    if (!deleted) {
      throw new NotFoundApplicationError('Apply not found!');
    }

    return true;
  }
}
