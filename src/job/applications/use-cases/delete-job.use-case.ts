import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  DELETE_JOB_REPOSITORY_INTERFACE,
  type DeleteJobRepositoryInterface,
} from '@src/job/applications/contracts/delete-job.repository-interface';
import type { DeleteJobUseCaseInterface } from '@src/job/applications/contracts/delete-job.use-case-interface';

@Injectable()
export class DeleteJobUseCase implements DeleteJobUseCaseInterface {
  constructor(
    @Inject(DELETE_JOB_REPOSITORY_INTERFACE)
    private readonly deleteJobRepository: DeleteJobRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.deleteJobRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('Job not found!');
    }

    return true;
  }
}
