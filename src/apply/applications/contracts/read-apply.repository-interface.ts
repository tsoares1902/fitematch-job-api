import type { ApplyRecord } from './apply-record.interface';

export const READ_APPLY_REPOSITORY = 'READ_APPLY_REPOSITORY';

export interface ReadApplyRepositoryInterface {
  findById(id: string): Promise<ApplyRecord | null>;
}
