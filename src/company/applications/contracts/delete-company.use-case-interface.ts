export const DELETE_COMPANY_USE_CASE = 'DELETE_COMPANY_USE_CASE';

export interface DeleteCompanyUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
