import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams, Type } from 'class-transformer';
import {
  IsInt,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import {
  type ListJobsSortField,
  type ListJobsSortOrder,
} from '@src/job/applications/contracts/list-job-query.interface';
import { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';

enum ListJobsSortFieldEnum {
  IS_PAID_ADVERTISING = 'isPaidAdvertising',
  SLUG = 'slug',
  TITLE = 'title',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

enum ListJobsSortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class ListJobsQueryDto {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }: TransformFnParams): unknown => {
    const rawValue: unknown = value;

    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    return rawValue;
  })
  @IsBoolean()
  isPaidAdvertising?: boolean;

  @ApiPropertyOptional({ example: 'company-slug', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @ApiPropertyOptional({ example: 'Job Title', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ example: 'john@example.com', maxLength: 255 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  slots?: number;

  @ApiPropertyOptional({
    example: '/images/logos/company-slug.png',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  cover?: string;

  @ApiPropertyOptional({
    example: JobRoleEnum.FREELANCE,
    enum: JobRoleEnum,
  })
  @IsOptional()
  @IsEnum(JobRoleEnum)
  role?: JobRoleEnum;

  @ApiPropertyOptional({
    example: JobStatusEnum.ACTIVE,
    enum: JobStatusEnum,
  })
  @IsOptional()
  @IsEnum(JobStatusEnum)
  status?: JobStatusEnum;

  @ApiPropertyOptional({
    example: ListJobsSortFieldEnum.CREATED_AT,
    enum: ListJobsSortFieldEnum,
  })
  @IsOptional()
  @IsEnum(ListJobsSortFieldEnum)
  sortBy?: ListJobsSortField;

  @ApiPropertyOptional({
    example: ListJobsSortOrderEnum.DESC,
    enum: ListJobsSortOrderEnum,
  })
  @IsOptional()
  @IsEnum(ListJobsSortOrderEnum)
  sortOrder?: ListJobsSortOrder;
}
