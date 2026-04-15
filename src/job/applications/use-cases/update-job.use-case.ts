import { type UpdateJobRepositoryInterface } from '@src/job/applications/contracts/update-job.repository-interface';
import type { CompanyReaderPort } from '@src/job/applications/contracts/company-reader.port';
import type { UpdateJobPayload } from '@src/job/applications/contracts/job-payload.interface';
import type { UpdateJobUseCaseInterface } from '@src/job/applications/contracts/update-job.use-case-interface';
import { JobEntity } from '@src/job/domain/entities/job.entity';
import type { JobOutput } from '@src/job/applications/contracts/job-output.interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class UpdateJobUseCase implements UpdateJobUseCaseInterface {
  constructor(
    private readonly updateJobRepository: UpdateJobRepositoryInterface,
    private readonly companyReader: CompanyReaderPort,
  ) {}

  async execute(id: string, data: UpdateJobPayload): Promise<JobOutput> {
    const job = await this.updateJobRepository.update(
      id,
      JobEntity.normalizeUpdate(data),
    );

    if (!job) {
      throw new NotFoundApplicationError('Job not found!');
    }

    const company = await this.companyReader.findById(job.companyId);

    if (!company) {
      throw new NotFoundApplicationError('Company not found!');
    }

    return {
      id: job.id,
      companyId: job.companyId,
      slug: job.slug,
      title: job.title,
      slots: job.slots,
      cover: job.cover,
      benefits: job.benefits,
      isPaidAdvertising: job.isPaidAdvertising,
      role: job.role,
      status: job.status,
      company,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  }
}
