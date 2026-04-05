import type { ApplyRecord } from './apply-record.interface';

export const READ_APPLY_USE_CASE = 'READ_APPLY_USE_CASE';

export interface ReadApplyUseCaseInterface {
  execute(id: string): Promise<ApplyRecord>;
}
