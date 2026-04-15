import { type ReadApplyRepositoryInterface } from '@src/apply/applications/contracts/read-apply.repository-interface';
import type { ReadApplyUseCaseInterface } from '@src/apply/applications/contracts/read-apply.use-case-interface';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class ReadApplyUseCase implements ReadApplyUseCaseInterface {
  constructor(
    private readonly readApplyRepository: ReadApplyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<ApplyRecord> {
    const apply = await this.readApplyRepository.findById(id);

    if (!apply) {
      throw new NotFoundApplicationError('Apply not found!');
    }

    return apply;
  }
}
