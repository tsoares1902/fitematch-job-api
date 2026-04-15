import { JobEntity } from '@src/job/domain/entities/job.entity';
import type { CompanyReaderPort } from '@src/job/applications/contracts/company-reader.port';
import { type ListJobRepositoryInterface } from '@src/job/applications/contracts/list-job.repository-interface';
import type { ListJobUseCaseInterface } from '@src/job/applications/contracts/list-job.use-case-interface';
import type { DataListJobsUseCaseInterface } from '@src/job/applications/contracts/list-job.use-case-interface';
import type { ResultListJobUseCaseInterface } from '@src/job/applications/contracts/list-job.use-case-interface';
import type { JobCompanyOutput } from '@src/job/applications/contracts/job-output.interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class ListJobUseCase implements ListJobUseCaseInterface {
  constructor(
    private readonly listJobRepository: ListJobRepositoryInterface,
    private readonly companyReader: CompanyReaderPort,
  ) {}

  async execute(
    filters: DataListJobsUseCaseInterface,
  ): Promise<ResultListJobUseCaseInterface> {
    const [{ data: jobs, totalItems, currentPage, itemsPerPage }, companies] =
      await Promise.all([
        this.listJobRepository.list(filters),
        this.companyReader.list(),
      ]);

    const companiesById = new Map<string, JobCompanyOutput>(
      companies.map((company) => [
        company.id,
        {
          id: company.id,
          slug: company.slug,
          name: company.name,
          address: company.address,
          social: company.social,
          role: company.role,
          logo: company.logo,
          cover: company.cover,
          status: company.status,
          createdAt: company.createdAt,
          updatedAt: company.updatedAt,
        },
      ]),
    );

    const data = jobs.map((job) => {
      const company = companiesById.get(job.companyId);
      const jobEntity = JobEntity.fromRecord(job);

      if (!company) {
        throw new NotFoundApplicationError(
          `Company not found for job ${job.id} and companyId ${job.companyId}`,
        );
      }

      return {
        id: job.id,
        companyId: job.companyId,
        isPaidAdvertising: job.isPaidAdvertising,
        slug: job.slug,
        title: job.title,
        slots: job.slots,
        cover: job.cover,
        benefits: jobEntity.getBenefits(),
        company,
        role: job.role,
        status: job.status,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      };
    });

    if (data.length <= 0) {
      return {
        data: [],
        pagination: this.getEmptyPagination(filters),
      };
    }

    return {
      data,
      pagination: {
        totalItems,
        itemCount: data.length,
        itemsPerPage,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        currentPage,
        hasNextPage: currentPage < Math.ceil(totalItems / itemsPerPage),
        hasPreviousPage: currentPage > 1,
      },
    };
  }

  private getEmptyPagination(
    filters: DataListJobsUseCaseInterface,
  ): ResultListJobUseCaseInterface['pagination'] {
    return {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: Number(filters.limit || 10),
      totalPages: 0,
      currentPage: Number(filters.page || 1),
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
}
