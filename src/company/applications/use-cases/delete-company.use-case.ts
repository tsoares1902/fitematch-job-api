import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  DELETE_COMPANY_REPOSITORY_INTERFACE,
  type DeleteCompanyRepositoryInterface,
} from '@src/company/applications/contracts/delete-company.repository-interface';
import type { DeleteCompanyUseCaseInterface } from '@src/company/applications/contracts/delete-company.use-case-interface';

@Injectable()
export class DeleteCompanyUseCase implements DeleteCompanyUseCaseInterface {
  constructor(
    @Inject(DELETE_COMPANY_REPOSITORY_INTERFACE)
    private readonly deleteCompanyRepository: DeleteCompanyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.deleteCompanyRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('Company not found!');
    }

    return true;
  }
}
