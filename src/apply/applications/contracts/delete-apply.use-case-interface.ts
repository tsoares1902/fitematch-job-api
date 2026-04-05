export const DELETE_APPLY_USE_CASE = 'DELETE_APPLY_USE_CASE';

export interface DeleteApplyUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
