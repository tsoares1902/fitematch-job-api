export const DELETE_COMPANY_USE_CASE_INTERFACE =
  'DELETE_COMPANY_USE_CASE_INTERFACE';

export interface DeleteCompanyUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
