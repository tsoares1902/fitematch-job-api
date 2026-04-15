export const DELETE_APPLY_REPOSITORY_INTERFACE =
  'DELETE_APPLY_REPOSITORY_INTERFACE';

export interface DeleteApplyRepositoryInterface {
  delete(id: string): Promise<boolean>;
}
