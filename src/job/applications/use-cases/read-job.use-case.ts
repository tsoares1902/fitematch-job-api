import { type ReadJobRepositoryInterface } from '@src/job/applications/contracts/read-job.repository-interface';
import type { CompanyReaderPort } from '@src/job/applications/contracts/company-reader.port';
import type { ReadJobUseCaseInterface } from '@src/job/applications/contracts/read-job.use-case-interface';
import { JobEntity } from '@src/job/domain/entities/job.entity';
import type { JobOutput } from '@src/job/applications/contracts/job-output.interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class ReadJobUseCase implements ReadJobUseCaseInterface {
  constructor(
    private readonly readJobRepository: ReadJobRepositoryInterface,
    private readonly companyReader: CompanyReaderPort,
  ) {}

  async execute(id: string): Promise<JobOutput> {
    const job = await this.readJobRepository.findById(id);

    if (!job) {
      throw new NotFoundApplicationError('Job not found!');
    }

    const company = await this.companyReader.findById(job.companyId);

    if (!company) {
      throw new NotFoundApplicationError('Company not found!');
    }

    const jobEntity = JobEntity.fromRecord(job);
    return {
      id: job.id,
      companyId: job.companyId,
      slug: job.slug,
      title: job.title,
      slots: job.slots,
      cover: job.cover,
      benefits: jobEntity.getBenefits(),
      isPaidAdvertising: job.isPaidAdvertising,
      role: job.role,
      status: job.status,
      company,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  }
}
