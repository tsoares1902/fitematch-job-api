import { ApiProperty } from '@nestjs/swagger';
import { CompanyRoleEnum } from '@src/company/applications/contracts/company-role.enum';
import { CompanyStatusEnum } from '@src/company/applications/contracts/company-status.enum';

export class ReadCompanyResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ enum: CompanyRoleEnum })
  role!: CompanyRoleEnum;

  @ApiProperty()
  logo?: string;

  @ApiProperty()
  cover?: string;

  @ApiProperty({ enum: CompanyStatusEnum })
  status!: CompanyStatusEnum;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
