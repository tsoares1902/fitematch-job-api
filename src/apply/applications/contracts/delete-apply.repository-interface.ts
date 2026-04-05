export const DELETE_APPLY_REPOSITORY = 'DELETE_APPLY_REPOSITORY';

export interface DeleteApplyRepositoryInterface {
  delete(id: string): Promise<boolean>;
}
