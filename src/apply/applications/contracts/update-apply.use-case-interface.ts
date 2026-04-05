import type { Apply } from './apply.interface';
import type { ApplyRecord } from './apply-record.interface';

export const UPDATE_APPLY_USE_CASE = 'UPDATE_APPLY_USE_CASE';

export interface UpdateApplyUseCaseInterface {
  execute(id: string, data: Partial<Apply>): Promise<ApplyRecord>;
}
