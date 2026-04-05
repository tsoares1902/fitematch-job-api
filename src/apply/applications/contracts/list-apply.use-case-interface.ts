import type { ApplyRecord } from './apply-record.interface';

export const LIST_APPLY_USE_CASE = 'LIST_APPLY_USE_CASE';

export interface ListApplyUseCaseInterface {
  execute(): Promise<ApplyRecord[]>;
}
