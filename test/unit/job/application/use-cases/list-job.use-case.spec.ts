import type { ListCompanyRepositoryInterface } from '@src/company/applications/contracts/list-company.repository-interface';
import type { CompanyRecord } from '@src/company/applications/contracts/company-record.interface';
import { CompanyRoleEnum } from '@src/company/applications/contracts/company-role.enum';
import { CompanyStatusEnum } from '@src/company/applications/contracts/company-status.enum';
import type { ListJobRepositoryInterface } from '@src/job/applications/contracts/list-job.repository-interface';
import type { Job } from '@src/job/applications/contracts/job.interface';
import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';
import { JobRoleEnum } from '@src/job/applications/contracts/job-role.enum';
import { JobStatusEnum } from '@src/job/applications/contracts/job-status.enum';
import { ListJobUseCase } from '@src/job/applications/use-cases/list-job.use-case';

describe('ListJobUseCase', () => {
  let useCase: ListJobUseCase;
  let repository: jest.Mocked<ListJobRepositoryInterface>;
  let companyRepository: jest.Mocked<ListCompanyRepositoryInterface>;

  const jobs: JobRecord[] = [
    {
      id: 'job-1',
      companyId: 'company-1',
      slug: 'backend-intern',
      title: 'Backend Intern',
      slots: 3,
      role: JobRoleEnum.INTERN,
      status: JobStatusEnum.ENABLED,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    },
    {
      id: 'job-2',
      companyId: 'company-2',
      slug: 'designer-contract',
      title: 'Designer Contract',
      slots: 1,
      role: JobRoleEnum.CONTRACT,
      status: JobStatusEnum.DISABLED,
      createdAt: new Date('2026-01-02T00:00:00.000Z'),
      updatedAt: new Date('2026-01-02T00:00:00.000Z'),
    },
  ];

  const companies: CompanyRecord[] = [
    {
      id: 'company-1',
      slug: 'tecfit',
      name: 'Tecfit',
      role: CompanyRoleEnum.MAIN,
      logo: '/images/tecfit.png',
      cover: '/images/tecfit-cover.png',
      status: CompanyStatusEnum.ACTIVE,
    },
    {
      id: 'company-2',
      slug: 'studio-fit',
      name: 'Studio Fit',
      role: CompanyRoleEnum.AFFILIATE,
      logo: '/images/studio-fit.png',
      cover: '/images/studio-fit-cover.png',
      status: CompanyStatusEnum.INACTIVE,
    },
  ];

  const expectedJobs: Job[] = [
    {
      ...jobs[0],
      company: {
        slug: 'tecfit',
        name: 'Tecfit',
        role: CompanyRoleEnum.MAIN,
        logo: '/images/tecfit.png',
        cover: '/images/tecfit-cover.png',
        status: CompanyStatusEnum.ACTIVE,
      },
    },
    {
      ...jobs[1],
      company: {
        slug: 'studio-fit',
        name: 'Studio Fit',
        role: CompanyRoleEnum.AFFILIATE,
        logo: '/images/studio-fit.png',
        cover: '/images/studio-fit-cover.png',
        status: CompanyStatusEnum.INACTIVE,
      },
    },
  ];

  beforeEach(() => {
    repository = {
      list: jest.fn(),
    };
    companyRepository = {
      list: jest.fn(),
    };

    useCase = new ListJobUseCase(repository, companyRepository);
  });

  it('should list jobs successfully', async () => {
    repository.list.mockResolvedValue(jobs);
    companyRepository.list.mockResolvedValue(companies);

    const result = await useCase.execute();

    expect(repository.list).toHaveBeenCalledTimes(1);
    expect(repository.list).toHaveBeenCalledWith();
    expect(companyRepository.list).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedJobs);
  });

  it('should return an empty list when there are no jobs', async () => {
    repository.list.mockResolvedValue([]);
    companyRepository.list.mockResolvedValue(companies);

    const result = await useCase.execute();

    expect(repository.list).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should propagate repository exceptions', async () => {
    const error = new Error('database unavailable');
    repository.list.mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow(error);
    expect(repository.list).toHaveBeenCalledTimes(1);
  });
});
