import type { Apply } from '@src/apply/domain/entities/apply.entity';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const UPDATE_APPLY_REPOSITORY_INTERFACE =
  'UPDATE_APPLY_REPOSITORY_INTERFACE';

export interface UpdateApplyRepositoryInterface {
  update(id: string, data: Partial<Apply>): Promise<ApplyRecord | null>;
}
