import { NotFoundException } from '@nestjs/common';
import { UpdateCompanyUseCase } from '@src/company/applications/use-cases/update-company.use-case';
import type { UpdateCompanyRepositoryInterface } from '@src/company/applications/contracts/update-company.repository-interface';
import { CompanyRoleEnum } from '@src/company/applications/contracts/company-role.enum';
import { CompanyStatusEnum } from '@src/company/applications/contracts/company-status.enum';
import type { Company } from '@src/company/applications/contracts/company.interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

describe('UpdateCompanyUseCase', () => {
  let useCase: UpdateCompanyUseCase;
  let repository: jest.Mocked<UpdateCompanyRepositoryInterface>;

  const companyId = 'company-id';
  const updateInput: Partial<Company> = {
    name: 'Tecfit Updated',
    logoAlt: 'Tecfit Updated',
    status: CompanyStatusEnum.INACTIVE,
  };

  const updatedCompany: CompanyRecord = {
    id: companyId,
    slug: 'tecfit',
    name: 'Tecfit Updated',
    role: CompanyRoleEnum.MAIN,
    logo: '/images/logo.png',
    logoAlt: 'Tecfit Updated',
    status: CompanyStatusEnum.INACTIVE,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  };

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    };

    useCase = new UpdateCompanyUseCase(repository);
  });

  it('should update a company successfully', async () => {
    repository.update.mockResolvedValue(updatedCompany);

    const result = await useCase.execute(companyId, updateInput);

    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledWith(companyId, updateInput);
    expect(result).toEqual(updatedCompany);
  });

  it('should throw NotFoundException when the company does not exist', async () => {
    repository.update.mockResolvedValue(null);

    await expect(useCase.execute(companyId, updateInput)).rejects.toThrow(
      NotFoundException,
    );
    await expect(useCase.execute(companyId, updateInput)).rejects.toThrow(
      'Company not found!',
    );
    expect(repository.update).toHaveBeenCalledWith(companyId, updateInput);
  });

  it('should propagate repository exceptions', async () => {
    const error = new Error('database unavailable');
    repository.update.mockRejectedValue(error);

    await expect(useCase.execute(companyId, updateInput)).rejects.toThrow(error);
    expect(repository.update).toHaveBeenCalledWith(companyId, updateInput);
  });
});
