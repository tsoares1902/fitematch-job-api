import { Injectable } from '@nestjs/common';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';
import { CreateApplyResponseDto } from '@src/apply/adapters/dto/responses/create-apply.response.dto';
import { ListApplyResponseDto } from '@src/apply/adapters/dto/responses/list-apply.response.dto';
import { ReadApplyResponseDto } from '@src/apply/adapters/dto/responses/read-apply.response.dto';
import { UpdateApplyResponseDto } from '@src/apply/adapters/dto/responses/update-apply.response.dto';

@Injectable()
export class ApplyResponseMapper {
  toResponse(
    apply: ApplyRecord,
  ):
    | CreateApplyResponseDto
    | ReadApplyResponseDto
    | UpdateApplyResponseDto
    | ListApplyResponseDto {
    return { ...apply };
  }

  toListResponse(applies: ApplyRecord[]): ListApplyResponseDto[] {
    return applies.map((apply) => ({ ...apply }));
  }
}
