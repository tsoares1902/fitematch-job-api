import type { ApplyRecord } from './apply-record.interface';

export const LIST_APPLY_REPOSITORY = 'LIST_APPLY_REPOSITORY';

export interface ListApplyRepositoryInterface {
  list(): Promise<ApplyRecord[]>;
}
