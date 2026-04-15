import type {
  CompanyReaderPort,
  JobCompanySnapshot,
} from '@src/job/applications/contracts/company-reader.port';
import type { ReadJobRepositoryInterface } from '@src/job/applications/contracts/read-job.repository-interface';
import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';
import { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';
import { ReadJobUseCase } from '@src/job/applications/use-cases/read-job.use-case';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

describe('ReadJobUseCase', () => {
  let useCase: ReadJobUseCase;
  let repository: ReadJobRepositoryInterface;
  let companyReader: CompanyReaderPort;
  let findJobByIdSpy: jest.SpiedFunction<
    ReadJobRepositoryInterface['findById']
  >;
  let findCompanyByIdSpy: jest.SpiedFunction<CompanyReaderPort['findById']>;

  const jobId = 'job-id';
  const companyId = 'company-id';

  const jobRecord: JobRecord = {
    id: jobId,
    companyId,
    isPaidAdvertising: true,
    slug: 'backend-intern',
    title: 'Backend Intern',
    slots: 3,
    cover: '/images/jobs/backend-intern.png',
    benefits: {
      salary: 2500,
      transportation: true,
      alimentation: true,
      health: true,
      parking: false,
      bonus: 'PLR trimestral',
    },
    role: JobRoleEnum.INTERN,
    status: JobStatusEnum.ACTIVE,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  const companyRecord: JobCompanySnapshot = {
    id: companyId,
    slug: 'tecfit',
    name: 'Tecfit',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'Sao Paulo',
      state: 'SP',
      country: 'Brasil',
    },
    social: {
      facebook: 'https://facebook.com/tecfit',
      instagram: 'https://instagram.com/tecfit',
      linkedin: 'https://linkedin.com/company/tecfit',
      twitter: 'https://x.com/tecfit',
    },
    role: 'main',
    logo: '/images/logo.png',
    cover: '/images/cover.png',
    status: 'active',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(() => {
    repository = {
      findById: () => Promise.resolve(null),
    };
    companyReader = {
      findById: () => Promise.resolve(null),
      list: () => Promise.resolve([]),
    };
    findJobByIdSpy = jest.spyOn(repository, 'findById');
    findCompanyByIdSpy = jest.spyOn(companyReader, 'findById');

    useCase = new ReadJobUseCase(repository, companyReader);
  });

  describe('execute', () => {
    it('should return a job with company details', async () => {
      findJobByIdSpy.mockResolvedValue(jobRecord);
      findCompanyByIdSpy.mockResolvedValue(companyRecord);

      const result = await useCase.execute(jobId);

      expect(findJobByIdSpy.mock.calls).toEqual([[jobId]]);
      expect(findCompanyByIdSpy.mock.calls).toEqual([[companyId]]);
      expect(result).toEqual({
        ...jobRecord,
        benefits: {
          ...jobRecord.benefits,
          salary: 2500,
        },
        company: {
          id: companyRecord.id,
          slug: companyRecord.slug,
          name: companyRecord.name,
          address: companyRecord.address,
          social: companyRecord.social,
          role: companyRecord.role,
          logo: companyRecord.logo,
          cover: companyRecord.cover,
          status: companyRecord.status,
          createdAt: companyRecord.createdAt,
          updatedAt: companyRecord.updatedAt,
        },
      });
    });

    it('should normalize nullable company fields and salary when absent', async () => {
      findJobByIdSpy.mockResolvedValue({
        ...jobRecord,
        isPaidAdvertising: undefined,
        cover: '',
        benefits: {
          ...jobRecord.benefits,
          salary: null,
        },
      });
      findCompanyByIdSpy.mockResolvedValue({
        ...companyRecord,
        social: {},
        logo: '',
        cover: '',
      });

      const result = await useCase.execute(jobId);

      expect(result.benefits.salary).toBeNull();
      expect(result.company.social).toEqual({});
      expect(result.company.logo).toBe('');
      expect(result.company.cover).toBe('');
    });

    it('should throw NotFoundApplicationError when the job does not exist', async () => {
      findJobByIdSpy.mockResolvedValue(null);
      const execution = useCase.execute(jobId);

      await expect(execution).rejects.toThrow(NotFoundApplicationError);
      await expect(execution).rejects.toThrow('Job not found!');
      expect(findJobByIdSpy.mock.calls).toEqual([[jobId]]);
      expect(findCompanyByIdSpy.mock.calls).toEqual([]);
    });

    it('should throw NotFoundApplicationError when the company does not exist', async () => {
      findJobByIdSpy.mockResolvedValue(jobRecord);
      findCompanyByIdSpy.mockResolvedValue(null);
      const execution = useCase.execute(jobId);

      await expect(execution).rejects.toThrow(NotFoundApplicationError);
      await expect(execution).rejects.toThrow('Company not found!');
      expect(findJobByIdSpy.mock.calls).toEqual([[jobId]]);
      expect(findCompanyByIdSpy.mock.calls).toEqual([[companyId]]);
    });

    it('should propagate repository exceptions', async () => {
      const error = new Error('database unavailable');
      findJobByIdSpy.mockRejectedValue(error);

      await expect(useCase.execute(jobId)).rejects.toThrow(error);
      expect(findJobByIdSpy.mock.calls).toEqual([[jobId]]);
    });
  });
});
