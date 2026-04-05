export const DELETE_JOB_USE_CASE = 'DELETE_JOB_USE_CASE';

export interface DeleteJobUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
