export const DELETE_APPLY_USE_CASE_INTERFACE =
  'DELETE_APPLY_USE_CASE_INTERFACE';

export interface DeleteApplyUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
