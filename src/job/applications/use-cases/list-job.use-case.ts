import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  LIST_COMPANY_REPOSITORY,
  type ListCompanyRepositoryInterface,
} from '@src/company/applications/contracts/list-company.repository-interface';
import type { ReadCompanyResponseDto } from '@src/company/adapters/dto/responses/read-company.response.dto';
import {
  LIST_JOB_REPOSITORY_INTERFACE,
  type ListJobRepositoryInterface,
} from '@src/job/applications/contracts/list-job.repository-interface';
import type { ListJobUseCaseInterface } from '@src/job/applications/contracts/list-job.use-case-interface';
import type { DataListJobsUseCaseInterface } from '@src/job/applications/contracts/list-job.use-case-interface';
import type { ResultListJobUseCaseInterface } from '@src/job/applications/contracts/result-list-job.use-case.interface';
import type { ListJobResponseDto } from '@src/job/adapters/dto/responses/list-job.response.dto';
import MasksUtils from '@src/shared/applications/utils/masks.utils';
import MetadataUtils from '@src/shared/applications/utils/metadata.utils';
import ResultPaginationInterface from '@src/shared/applications/contracts/result-pagination.interface';

@Injectable()
export class ListJobUseCase implements ListJobUseCaseInterface {
  private readonly listJobRepository: ListJobRepositoryInterface;

  private readonly listCompanyRepository: ListCompanyRepositoryInterface;

  private readonly metadataUtils: MetadataUtils;

  constructor(
    @Inject(LIST_JOB_REPOSITORY_INTERFACE)
    listJobRepository: ListJobRepositoryInterface,
    @Inject(LIST_COMPANY_REPOSITORY)
    listCompanyRepository: ListCompanyRepositoryInterface,
    /* c8 ignore next */
    metadataUtils: MetadataUtils,
  ) {
    this.listJobRepository = listJobRepository;
    this.listCompanyRepository = listCompanyRepository;
    this.metadataUtils = metadataUtils;
  }

  async execute(
    filters: DataListJobsUseCaseInterface,
  ): Promise<ResultListJobUseCaseInterface> {
    const [{ data: jobs, totalItems, currentPage, itemsPerPage }, companies] =
      await Promise.all([
        this.listJobRepository.list(filters),
        this.listCompanyRepository.list(),
      ]);

    const companiesById = new Map<string, ReadCompanyResponseDto>(
      companies.map((company) => [
        company.id,
        {
          id: company.id,
          slug: company.slug,
          name: company.name,
          address: company.address,
          social: company.social ?? {},
          role: company.role,
          logo: company.logo ?? '',
          cover: company.cover ?? '',
          status: company.status,
          createdAt: company.createdAt,
          updatedAt: company.updatedAt,
        },
      ]),
    );

    const data = jobs.map((job): ListJobResponseDto => {
      const company = companiesById.get(job.companyId);

      if (!company) {
        throw new NotFoundException(
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
        benefits: {
          ...job.benefits,
          salary:
            job.benefits.salary === null || job.benefits.salary === undefined
              ? null
              : MasksUtils.applyBrazilianSalaryMask(
                  String(job.benefits.salary),
                ),
        },
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
        metadata: {
          pagination: this.getEmptyMetadata(filters),
        },
      };
    }

    return {
      data,
      metadata: {
        pagination: this.metadataUtils.getDadosPaginacao(
          totalItems,
          data.length,
          itemsPerPage,
          currentPage,
          filters.route,
        ),
      },
    };
  }

  private getEmptyMetadata(
    filters: DataListJobsUseCaseInterface,
  ): ResultPaginationInterface {
    return {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: Number(filters.limit || 10),
      totalPages: 0,
      currentPage: Number(filters.page || 1),
      hasNextPage: false,
      hasPreviousPage: false,
      links: {
        first: filters.route,
        previous: '',
        next: '',
        last: '',
      },
    };
  }
}
