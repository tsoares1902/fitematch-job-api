import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const LIST_APPLY_USE_CASE_INTERFACE = 'LIST_APPLY_USE_CASE_INTERFACE';

export interface ListApplyUseCaseInterface {
  execute(): Promise<ApplyRecord[]>;
}
