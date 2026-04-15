import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const READ_APPLY_USE_CASE_INTERFACE = 'READ_APPLY_USE_CASE_INTERFACE';

export interface ReadApplyUseCaseInterface {
  execute(id: string): Promise<ApplyRecord>;
}
