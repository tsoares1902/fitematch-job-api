export const DELETE_JOB_REPOSITORY_INTERFACE =
  'DELETE_JOB_REPOSITORY_INTERFACE';

export interface DeleteJobRepositoryInterface {
  delete(id: string): Promise<boolean>;
}
