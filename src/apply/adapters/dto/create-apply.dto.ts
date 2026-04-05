import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApplyStatusEnum } from '@src/apply/applications/contracts/apply-status.enum';

export class CreateApplyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobId!: string;

  @ApiProperty({ example: ApplyStatusEnum.ACTIVE, enum: ApplyStatusEnum })
  @IsEnum(ApplyStatusEnum)
  status!: ApplyStatusEnum;
}
