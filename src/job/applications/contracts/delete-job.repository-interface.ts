export const DELETE_JOB_REPOSITORY = 'DELETE_JOB_REPOSITORY';

export interface DeleteJobRepositoryInterface {
  delete(id: string): Promise<boolean>;
}
