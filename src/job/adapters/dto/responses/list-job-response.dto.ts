import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ListJobResponseDto } from './list-job.response.dto';

class LinksDto {
  @ApiProperty()
  first!: string;

  @ApiProperty()
  previous!: string;

  @ApiProperty()
  next!: string;

  @ApiProperty()
  last!: string;
}

class ResponsePaginationDto {
  @ApiProperty()
  totalItems!: number;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  itemsPerPage!: number;

  @ApiProperty()
  totalPages!: number;

  @ApiProperty()
  currentPage!: number;

  @ApiPropertyOptional()
  hasNextPage?: boolean;

  @ApiPropertyOptional()
  hasPreviousPage?: boolean;

  @ApiProperty({ type: LinksDto })
  links!: LinksDto;
}

class ResponseMetadataDto {
  @ApiPropertyOptional({ type: ResponsePaginationDto, nullable: true })
  pagination?: ResponsePaginationDto | null;
}

export class ResponseListJobsDto {
  @ApiProperty({ type: [ListJobResponseDto] })
  data!: ListJobResponseDto[];

  @ApiProperty({ type: ResponseMetadataDto })
  metadata!: ResponseMetadataDto;
}
