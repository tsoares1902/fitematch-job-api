import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  JobOutput,
  ListJobsOutput,
} from '@src/job/applications/contracts/job-output.interface';
import { JobSalaryFormatter } from '@src/job/adapters/controllers/formatters/job-salary.formatter';
import { ResponseListJobsDto } from '@src/job/adapters/dto/responses/list-job-response.dto';
import { ReadJobResponseDto } from '@src/job/adapters/dto/responses/read-job.response.dto';
import { HttpPaginationMapper } from '@src/shared/presentation/http/pagination/http-pagination.mapper';

@Injectable()
export class JobResponseMapper {
  constructor(
    private readonly httpPaginationMapper: HttpPaginationMapper,
    private readonly configService: ConfigService,
  ) {}

  toResponse(job: JobOutput): ReadJobResponseDto {
    return {
      ...job,
      benefits: {
        ...job.benefits,
        salary:
          job.benefits.salary === null || job.benefits.salary === undefined
            ? null
            : JobSalaryFormatter.formatBrazilianCurrency(
                String(job.benefits.salary),
              ),
      },
    };
  }

  toListResponse(data: ListJobsOutput): ResponseListJobsDto {
    const route = `${this.configService.get('JOB_API_URL') ?? ''}/job`;

    return {
      data: data.data.map((job) => this.toResponse(job)),
      metadata: {
        pagination: this.httpPaginationMapper.toPagination(
          data.pagination.totalItems,
          data.pagination.itemCount,
          data.pagination.itemsPerPage,
          data.pagination.currentPage,
          route,
        ),
      },
    };
  }
}
