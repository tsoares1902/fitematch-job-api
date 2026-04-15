import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class JobCompanyAddressResponseDto {
  @ApiProperty()
  street!: string;

  @ApiProperty()
  number!: string;

  @ApiProperty()
  neighborhood!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  state!: string;

  @ApiProperty()
  country!: string;
}

class JobCompanySocialResponseDto {
  @ApiPropertyOptional()
  facebook?: string;

  @ApiPropertyOptional()
  instagram?: string;

  @ApiPropertyOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  twitter?: string;
}

export class JobCompanyResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: JobCompanyAddressResponseDto })
  address!: JobCompanyAddressResponseDto;

  @ApiProperty({ type: JobCompanySocialResponseDto })
  social!: JobCompanySocialResponseDto;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  logo!: string;

  @ApiProperty()
  cover!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
