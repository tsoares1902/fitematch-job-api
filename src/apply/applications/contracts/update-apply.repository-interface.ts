import type { Apply } from './apply.interface';
import type { ApplyRecord } from './apply-record.interface';

export const UPDATE_APPLY_REPOSITORY = 'UPDATE_APPLY_REPOSITORY';

export interface UpdateApplyRepositoryInterface {
  update(id: string, data: Partial<Apply>): Promise<ApplyRecord | null>;
}
