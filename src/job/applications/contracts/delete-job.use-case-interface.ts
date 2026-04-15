export const DELETE_JOB_USE_CASE_INTERFACE = 'DELETE_JOB_USE_CASE_INTERFACE';

export interface DeleteJobUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
