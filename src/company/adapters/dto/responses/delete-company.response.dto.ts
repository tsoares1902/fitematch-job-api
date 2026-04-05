import { ApiProperty } from '@nestjs/swagger';

export class DeleteCompanyResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;
}
