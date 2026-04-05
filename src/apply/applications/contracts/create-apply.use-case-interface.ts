import type { Apply } from './apply.interface';
import type { ApplyRecord } from './apply-record.interface';

export const CREATE_APPLY_USE_CASE = 'CREATE_APPLY_USE_CASE';

export interface CreateApplyUseCaseInterface {
  execute(data: Apply): Promise<ApplyRecord>;
}
