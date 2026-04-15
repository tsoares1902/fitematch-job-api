export const DELETE_COMPANY_REPOSITORY_INTERFACE =
  'DELETE_COMPANY_REPOSITORY_INTERFACE';

export interface DeleteCompanyRepositoryInterface {
  delete(id: string): Promise<boolean>;
}
