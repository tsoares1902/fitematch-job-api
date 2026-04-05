import { ConflictException } from '@nestjs/common';
import { CreateCompanyUseCase } from '@src/company/applications/use-cases/create-company.use-case';
import type { CreateCompanyRepositoryInterface } from '@src/company/applications/contracts/create-company.repository-interface';
import { CompanyRoleEnum } from '@src/company/applications/contracts/company-role.enum';
import { CompanyStatusEnum } from '@src/company/applications/contracts/company-status.enum';
import type { Company } from '@src/company/applications/contracts/company.interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';

describe('CreateCompanyUseCase', () => {
  let useCase: CreateCompanyUseCase;
  let repository: jest.Mocked<CreateCompanyRepositoryInterface>;

  const companyInput: Company = {
    slug: 'tecfit',
    name: 'Tecfit',
    logo: '/images/logo.png',
    cover: '/images/cover.png',
  };

  const companyRecord: CompanyRecord = {
    id: 'company-id',
    slug: 'tecfit',
    name: 'Tecfit',
    role: CompanyRoleEnum.MAIN,
    logo: '/images/logo.png',
    cover: '/images/cover.png',
    status: CompanyStatusEnum.ACTIVE,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    };

    useCase = new CreateCompanyUseCase(repository);
  });

  it('should create a company successfully', async () => {
    repository.create.mockResolvedValue(companyRecord);

    const result = await useCase.execute(companyInput);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(companyInput);
    expect(result).toEqual(companyRecord);
  });

  it('should preserve optional fields when provided', async () => {
    const inputWithOptionalFields: Company = {
      ...companyInput,
      role: CompanyRoleEnum.AFFILIATE,
      status: CompanyStatusEnum.INACTIVE,
    };

    repository.create.mockResolvedValue({
      ...companyRecord,
      role: CompanyRoleEnum.AFFILIATE,
      status: CompanyStatusEnum.INACTIVE,
    });

    await useCase.execute(inputWithOptionalFields);

    expect(repository.create).toHaveBeenCalledWith(inputWithOptionalFields);
  });

  it('should propagate repository exceptions', async () => {
    const error = new ConflictException('slug already exists');
    repository.create.mockRejectedValue(error);

    await expect(useCase.execute(companyInput)).rejects.toThrow(error);
    expect(repository.create).toHaveBeenCalledWith(companyInput);
  });
});
