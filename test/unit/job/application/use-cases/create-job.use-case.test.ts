import type {
  CompanyReaderPort,
  JobCompanySnapshot,
} from '@src/job/applications/contracts/company-reader.port';
import type { CreateJobRepositoryInterface } from '@src/job/applications/contracts/create-job.repository-interface';
import type { JobPayload } from '@src/job/applications/contracts/job-payload.interface';
import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';
import { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';
import { CreateJobUseCase } from '@src/job/applications/use-cases/create-job.use-case';
import { ConflictApplicationError } from '@src/shared/application/errors/conflict.application-error';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

describe('CreateJobUseCase', () => {
  let useCase: CreateJobUseCase;
  let repository: {
    create: jest.MockedFunction<CreateJobRepositoryInterface['create']>;
  };
  let companyReader: {
    findById: jest.MockedFunction<CompanyReaderPort['findById']>;
    list: jest.MockedFunction<CompanyReaderPort['list']>;
  };

  const companyId = 'company-id';
  const jobInput: JobPayload = {
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
  };

  const jobRecord: JobRecord = {
    id: 'job-id',
    ...jobInput,
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
      create: jest.fn(),
    };
    companyReader = {
      findById: jest.fn(),
      list: jest.fn(),
    };

    useCase = new CreateJobUseCase(repository, companyReader);
  });

  describe('execute', () => {
    it('should create a job successfully', async () => {
      repository.create.mockResolvedValue(jobRecord);
      companyReader.findById.mockResolvedValue(companyRecord);

      const result = await useCase.execute(jobInput);

      expect(repository.create.mock.calls).toEqual([[jobInput]]);
      expect(companyReader.findById.mock.calls).toEqual([[companyId]]);
      expect(result).toEqual({
        ...jobRecord,
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

    it('should normalize optional company fields', async () => {
      repository.create.mockResolvedValue({
        ...jobRecord,
        isPaidAdvertising: undefined,
      });
      companyReader.findById.mockResolvedValue({
        ...companyRecord,
        social: {},
        logo: '',
        cover: '',
      });

      const result = await useCase.execute(jobInput);

      expect(result.company.social).toEqual({});
      expect(result.company.logo).toBe('');
      expect(result.company.cover).toBe('');
    });

    it('should preserve all provided fields', async () => {
      const customJobInput: JobPayload = {
        ...jobInput,
        role: JobRoleEnum.FREELANCE,
        status: JobStatusEnum.FREEZE,
        slots: 5,
      };

      repository.create.mockResolvedValue({
        ...jobRecord,
        ...customJobInput,
      });
      companyReader.findById.mockResolvedValue(companyRecord);

      await useCase.execute(customJobInput);

      expect(repository.create.mock.calls).toEqual([[customJobInput]]);
    });

    it('should throw NotFoundApplicationError when the company does not exist', async () => {
      repository.create.mockResolvedValue(jobRecord);
      companyReader.findById.mockResolvedValue(null);
      const execution = useCase.execute(jobInput);

      await expect(execution).rejects.toThrow(NotFoundApplicationError);
      await expect(execution).rejects.toThrow('Company not found!');
      expect(companyReader.findById.mock.calls).toEqual([[companyId]]);
    });

    it('should propagate repository exceptions', async () => {
      const error = new ConflictApplicationError('slug already exists');
      repository.create.mockRejectedValue(error);

      await expect(useCase.execute(jobInput)).rejects.toThrow(error);
      expect(repository.create.mock.calls).toEqual([[jobInput]]);
    });
  });
});
