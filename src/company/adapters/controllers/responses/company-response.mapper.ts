import { Injectable } from '@nestjs/common';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';
import { CreateCompanyResponseDto } from '@src/company/adapters/dto/responses/create-company.response.dto';
import { ListCompanyResponseDto } from '@src/company/adapters/dto/responses/list-company.response.dto';
import { ReadCompanyResponseDto } from '@src/company/adapters/dto/responses/read-company.response.dto';
import { UpdateCompanyResponseDto } from '@src/company/adapters/dto/responses/update-company.response.dto';

@Injectable()
export class CompanyResponseMapper {
  toResponse(
    company: CompanyRecord,
  ):
    | CreateCompanyResponseDto
    | ReadCompanyResponseDto
    | UpdateCompanyResponseDto
    | ListCompanyResponseDto {
    return {
      ...company,
      logo: company.logo ?? undefined,
      cover: company.cover ?? undefined,
    };
  }

  toListResponse(companies: CompanyRecord[]): ListCompanyResponseDto[] {
    return companies.map((company) => ({
      ...company,
      logo: company.logo ?? undefined,
      cover: company.cover ?? undefined,
    }));
  }
}
