import type { Apply } from '@src/apply/applications/contracts/apply.interface';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const UPDATE_APPLY_USE_CASE_INTERFACE =
  'UPDATE_APPLY_USE_CASE_INTERFACE';

export interface UpdateApplyUseCaseInterface {
  execute(id: string, data: Partial<Apply>): Promise<ApplyRecord>;
}
