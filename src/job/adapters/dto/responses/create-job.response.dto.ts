import { ApiProperty } from '@nestjs/swagger';
import { JobCompanyResponseDto } from '@src/job/adapters/dto/job-company.response.dto';
import { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';
import { JobBenefitsResponseDto } from '../job-details.dto';

export class CreateJobResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  slots!: number;

  @ApiProperty()
  cover!: string;

  @ApiProperty({ type: JobBenefitsResponseDto })
  benefits!: JobBenefitsResponseDto;

  @ApiProperty({ default: false })
  isPaidAdvertising?: boolean;

  @ApiProperty({ enum: JobRoleEnum })
  role!: JobRoleEnum;

  @ApiProperty({ enum: JobStatusEnum })
  status!: JobStatusEnum;

  @ApiProperty({ type: JobCompanyResponseDto })
  company!: JobCompanyResponseDto;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
