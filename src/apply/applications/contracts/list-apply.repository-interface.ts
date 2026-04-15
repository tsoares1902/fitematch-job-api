import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const LIST_APPLY_REPOSITORY_INTERFACE =
  'LIST_APPLY_REPOSITORY_INTERFACE';

export interface ListApplyRepositoryInterface {
  list(): Promise<ApplyRecord[]>;
}
