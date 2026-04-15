import { type CreateJobRepositoryInterface } from '@src/job/applications/contracts/create-job.repository-interface';
import type { CompanyReaderPort } from '@src/job/applications/contracts/company-reader.port';
import type { CreateJobUseCaseInterface } from '@src/job/applications/contracts/create-job.use-case-interface';
import type { JobPayload } from '@src/job/applications/contracts/job-payload.interface';
import { JobEntity } from '@src/job/domain/entities/job.entity';
import type { JobOutput } from '@src/job/applications/contracts/job-output.interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class CreateJobUseCase implements CreateJobUseCaseInterface {
  constructor(
    private readonly createJobRepository: CreateJobRepositoryInterface,
    private readonly companyReader: CompanyReaderPort,
  ) {}

  async execute(data: JobPayload): Promise<JobOutput> {
    const jobToCreate = JobEntity.create(data);
    const job = await this.createJobRepository.create(
      jobToCreate.toPrimitives(),
    );

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
