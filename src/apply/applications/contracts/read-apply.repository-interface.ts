import type { ApplyRecord } from '@src/apply/applications/contracts/apply-record.interface';

export const READ_APPLY_REPOSITORY_INTERFACE =
  'READ_APPLY_REPOSITORY_INTERFACE';

export interface ReadApplyRepositoryInterface {
  findById(id: string): Promise<ApplyRecord | null>;
}
