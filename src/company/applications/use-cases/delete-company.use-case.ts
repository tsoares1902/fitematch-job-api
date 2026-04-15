import { type DeleteCompanyRepositoryInterface } from '@src/company/applications/contracts/delete-company.repository-interface';
import type { DeleteCompanyUseCaseInterface } from '@src/company/applications/contracts/delete-company.use-case-interface';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

export class DeleteCompanyUseCase implements DeleteCompanyUseCaseInterface {
  constructor(
    private readonly deleteCompanyRepository: DeleteCompanyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.deleteCompanyRepository.delete(id);

    if (!deleted) {
      throw new NotFoundApplicationError('Company not found!');
    }

    return true;
  }
}
