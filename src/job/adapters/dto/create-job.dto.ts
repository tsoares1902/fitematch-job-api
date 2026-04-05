import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { JobRoleEnum } from '@src/job/applications/contracts/job-role.enum';
import { JobStatusEnum } from '@src/job/applications/contracts/job-status.enum';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @ApiProperty({ example: 'backend-intern', minLength: 2, maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(64)
  slug!: string;

  @ApiProperty({ example: 'Backend Intern', minLength: 2, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title!: string;

  @ApiProperty({ example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  slots!: number;

  @ApiProperty({ example: JobRoleEnum.INTERN, enum: JobRoleEnum })
  @IsEnum(JobRoleEnum)
  role!: JobRoleEnum;

  @ApiProperty({ example: JobStatusEnum.ENABLED, enum: JobStatusEnum })
  @IsEnum(JobStatusEnum)
  status!: JobStatusEnum;
}
