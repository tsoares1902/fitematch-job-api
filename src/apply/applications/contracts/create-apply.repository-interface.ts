import type { Apply } from './apply.interface';
import type { ApplyRecord } from './apply-record.interface';

export const CREATE_APPLY_REPOSITORY = 'CREATE_APPLY_REPOSITORY';

export interface CreateApplyRepositoryInterface {
  create(data: Apply): Promise<ApplyRecord>;
}
