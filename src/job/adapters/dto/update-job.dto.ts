import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { JobRoleEnum } from '@src/job/applications/contracts/job-role.enum';
import { JobStatusEnum } from '@src/job/applications/contracts/job-status.enum';

export class UpdateJobDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty({
    example: 'backend-intern',
    minLength: 2,
    maxLength: 64,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  slug?: string;

  @ApiProperty({
    example: 'Backend Intern',
    minLength: 2,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  title?: string;

  @ApiProperty({ example: 3, minimum: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  slots?: number;

  @ApiProperty({ example: false, required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isPaidAdvertising?: boolean;

  @ApiProperty({ example: JobRoleEnum.INTERN, enum: JobRoleEnum, required: false })
  @IsOptional()
  @IsEnum(JobRoleEnum)
  role?: JobRoleEnum;

  @ApiProperty({
    example: JobStatusEnum.ENABLED,
    enum: JobStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(JobStatusEnum)
  status?: JobStatusEnum;
}
