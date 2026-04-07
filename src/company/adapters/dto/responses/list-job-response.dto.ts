import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class JobBenefitsDTO {
  @ApiPropertyOptional()
  salary?: number;

  @ApiPropertyOptional()
  transportation?: boolean;

  @ApiPropertyOptional()
  alimentation?: boolean;

  @ApiPropertyOptional()
  health?: boolean;

  @ApiPropertyOptional()
  parking?: boolean;

  @ApiPropertyOptional()
  bonus?: boolean;
}

class JobBCompanyDTO {
  @ApiPropertyOptional()
  salary?: number;

  @ApiPropertyOptional()
  transportation?: boolean;

  @ApiPropertyOptional()
  alimentation?: boolean;

  @ApiPropertyOptional()
  health?: boolean;

  @ApiPropertyOptional()
  parking?: boolean;

  @ApiPropertyOptional()
  bonus?: boolean;
}

class JobDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  isPaidAdvertising!: boolean;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  slots!: number;

  @ApiProperty()
  cover!: string;

  @ApiProperty()
  benefits!: JobBenefitsDTO;

  @ApiProperty()
  company!: JobBCompanyDTO;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  status!: string;
}

class LinksDTO {
  @ApiProperty()
  first!: string;

  @ApiProperty()
  previous!: string;

  @ApiProperty()
  next!: string;

  @ApiProperty()
  last!: string;
}

export class ResponsePaginationDTO {
  @ApiProperty({ type: Number })
  totalItems!: number;

  @ApiProperty({ type: Number })
  itemCount!: number;

  @ApiProperty({ type: Number })
  itemsPerPage!: number;

  @ApiProperty({ type: Number })
  totalPages!: number;

  @ApiProperty({ type: Number })
  currentPage!: number;

  @ApiPropertyOptional({ type: Boolean })
  hasNextPage?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  hasPreviousPage?: boolean;

  @ApiProperty({ type: LinksDTO })
  links!: LinksDTO;
}

export class ResponseMetadataDTO {
  @ApiPropertyOptional({ type: ResponsePaginationDTO, nullable: true })
  pagination?: ResponsePaginationDTO | null;
}

export class ResponseListJobsDTO {
  @ApiProperty({
    type: [JobDTO],
  })
  data!: JobDTO[];

  @ApiProperty({ type: ResponseMetadataDTO })
  metadata!: ResponseMetadataDTO;
}
