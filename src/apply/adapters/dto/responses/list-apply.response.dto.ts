import { ApiProperty } from '@nestjs/swagger';
import { ApplyStatusEnum } from '@src/apply/domain/enums/apply-status.enum';

export class ListApplyResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  jobId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ enum: ApplyStatusEnum })
  status!: ApplyStatusEnum;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
