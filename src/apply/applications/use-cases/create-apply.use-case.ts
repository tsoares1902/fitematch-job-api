import { Inject, Injectable } from '@nestjs/common';
import {
  CREATE_APPLY_REPOSITORY,
  type CreateApplyRepositoryInterface,
} from '@src/apply/applications/contracts/create-apply.repository-interface';
import type { CreateApplyUseCaseInterface } from '@src/apply/applications/contracts/create-apply.use-case-interface';
import type { Apply } from '@src/apply/applications/contracts/apply.interface';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

@Injectable()
export class CreateApplyUseCase implements CreateApplyUseCaseInterface {
  constructor(
    @Inject(CREATE_APPLY_REPOSITORY)
    private readonly createApplyRepository: CreateApplyRepositoryInterface,
  ) {}

  async execute(data: Apply): Promise<ApplyRecord> {
    return this.createApplyRepository.create({
      ...data,
    });
  }
}
