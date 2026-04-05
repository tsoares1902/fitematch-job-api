export const DELETE_COMPANY_REPOSITORY = 'DELETE_COMPANY_REPOSITORY';

export interface DeleteCompanyRepositoryInterface {
  delete(id: string): Promise<boolean>;
}
