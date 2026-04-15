import type { Apply } from '@src/apply/domain/entities/apply.entity';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const CREATE_APPLY_USE_CASE_INTERFACE =
  'CREATE_APPLY_USE_CASE_INTERFACE';

export interface CreateApplyUseCaseInterface {
  execute(data: Apply): Promise<ApplyRecord>;
}
