import { type DeleteJobRepositoryInterface } from '@src/job/applications/contracts/delete-job.repository-interface';
import type { DeleteJobUseCaseInterface } from '@src/job/applications/contracts/delete-job.use-case-interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class DeleteJobUseCase implements DeleteJobUseCaseInterface {
  constructor(
    private readonly deleteJobRepository: DeleteJobRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.deleteJobRepository.delete(id);

    if (!deleted) {
      throw new NotFoundApplicationError('Job not found!');
    }

    return true;
  }
}
