import type { CreateApplyRepositoryInterface } from '@src/apply/applications/contracts/create-apply.repository-interface';
import type { CreateApplyUseCaseInterface } from '@src/apply/applications/contracts/create-apply.use-case-interface';
import {
  ApplyEntity,
  type Apply,
} from '@src/apply/domain/entities/apply.entity';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export class CreateApplyUseCase implements CreateApplyUseCaseInterface {
  constructor(
    private readonly createApplyRepository: CreateApplyRepositoryInterface,
  ) {}

  async execute(data: Apply): Promise<ApplyRecord> {
    const apply = ApplyEntity.create(data);

    return this.createApplyRepository.create(apply.toPrimitives());
  }
}
