import { NotFoundException } from '@nestjs/common';
import type { ReadCompanyRepositoryInterface } from '@src/company/applications/contracts/read-company.repository-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';
import { CompanyRoleEnum } from '@src/company/applications/contracts/company-role.enum';
import { CompanyStatusEnum } from '@src/company/applications/contracts/company-status.enum';
import type { ReadJobRepositoryInterface } from '@src/job/applications/contracts/read-job.repository-interface';
import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';
import { JobRoleEnum } from '@src/job/applications/contracts/job-role.enum';
import { JobStatusEnum } from '@src/job/applications/contracts/job-status.enum';
import { ReadJobUseCase } from '@src/job/applications/use-cases/read-job.use-case';

describe('ReadJobUseCase', () => {
  let useCase: ReadJobUseCase;
  let repository: jest.Mocked<ReadJobRepositoryInterface>;
  let companyRepository: jest.Mocked<ReadCompanyRepositoryInterface>;

  const jobId = 'job-id';
  const jobRecord: JobRecord = {
    id: jobId,
    companyId: 'company-id',
    slug: 'backend-intern',
    title: 'Backend Intern',
    slots: 3,
    role: JobRoleEnum.INTERN,
    status: JobStatusEnum.ENABLED,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  const companyRecord: CompanyRecord = {
    id: 'company-id',
    slug: 'tecfit',
    name: 'Tecfit',
    role: CompanyRoleEnum.MAIN,
    logo: '/images/logo.png',
    cover: '/images/cover.png',
    status: CompanyStatusEnum.ACTIVE,
  };

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    };
    companyRepository = {
      findById: jest.fn(),
    };

    useCase = new ReadJobUseCase(repository, companyRepository);
  });

  it('should return a job when it exists', async () => {
    repository.findById.mockResolvedValue(jobRecord);
    companyRepository.findById.mockResolvedValue(companyRecord);

    const result = await useCase.execute(jobId);

    expect(repository.findById).toHaveBeenCalledTimes(1);
    expect(repository.findById).toHaveBeenCalledWith(jobId);
    expect(companyRepository.findById).toHaveBeenCalledWith(jobRecord.companyId);
    expect(result).toEqual({
      ...jobRecord,
      company: {
        slug: companyRecord.slug,
        name: companyRecord.name,
        role: companyRecord.role,
        logo: companyRecord.logo,
        cover: companyRecord.cover,
        status: companyRecord.status,
      },
    });
  });

  it('should throw NotFoundException when the job does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute(jobId)).rejects.toThrow(NotFoundException);
    await expect(useCase.execute(jobId)).rejects.toThrow('Job not found!');
    expect(repository.findById).toHaveBeenCalledWith(jobId);
  });

  it('should propagate repository exceptions', async () => {
    const error = new Error('database unavailable');
    repository.findById.mockRejectedValue(error);

    await expect(useCase.execute(jobId)).rejects.toThrow(error);
    expect(repository.findById).toHaveBeenCalledWith(jobId);
  });
});
