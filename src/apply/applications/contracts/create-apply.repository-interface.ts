import type { Apply } from '@src/apply/applications/contracts/apply.interface';
import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const CREATE_APPLY_REPOSITORY_INTERFACE =
  'CREATE_APPLY_REPOSITORY_INTERFACE';

export interface CreateApplyRepositoryInterface {
  create(data: Apply): Promise<ApplyRecord>;
}
