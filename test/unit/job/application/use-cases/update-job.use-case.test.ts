import type {
  CompanyReaderPort,
  JobCompanySnapshot,
} from '@src/job/applications/contracts/company-reader.port';
import type { UpdateJobPayload } from '@src/job/applications/contracts/job-payload.interface';
import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';
import { JobRoleEnum } from '@src/job/domain/enums/job-role.enum';
import { JobStatusEnum } from '@src/job/domain/enums/job-status.enum';
import type { UpdateJobRepositoryInterface } from '@src/job/applications/contracts/update-job.repository-interface';
import { UpdateJobUseCase } from '@src/job/applications/use-cases/update-job.use-case';
import { NotFoundApplicationError } from '@src/shared/application/errors/not-found.application-error';

describe('UpdateJobUseCase', () => {
  let useCase: UpdateJobUseCase;
  let repository: {
    update: jest.MockedFunction<UpdateJobRepositoryInterface['update']>;
  };
  let companyReader: {
    findById: jest.MockedFunction<CompanyReaderPort['findById']>;
    list: jest.MockedFunction<CompanyReaderPort['list']>;
  };

  const jobId = 'job-id';
  const companyId = 'company-id';
  const updateInput: UpdateJobPayload = {
    title: 'Backend Freelance',
    slots: 5,
    role: JobRoleEnum.FREELANCE,
    status: JobStatusEnum.FREEZE,
  };

  const updatedJob: JobRecord = {
    id: jobId,
    companyId,
    isPaidAdvertising: false,
    slug: 'backend-intern',
    title: 'Backend Freelance',
    slots: 5,
    cover: '/images/jobs/backend-freelance.png',
    benefits: {
      salary: 2500,
      transportation: true,
      alimentation: true,
      health: true,
      parking: false,
      bonus: 'PLR trimestral',
    },
    role: JobRoleEnum.FREELANCE,
    status: JobStatusEnum.FREEZE,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
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
      update: jest.fn(),
    };
    companyReader = {
      findById: jest.fn(),
      list: jest.fn(),
    };

    useCase = new UpdateJobUseCase(repository, companyReader);
  });

  describe('execute', () => {
    it('should update a job successfully', async () => {
      repository.update.mockResolvedValue(updatedJob);
      companyReader.findById.mockResolvedValue(companyRecord);

      const result = await useCase.execute(jobId, updateInput);

      expect(repository.update.mock.calls).toEqual([[jobId, updateInput]]);
      expect(companyReader.findById.mock.calls).toEqual([[companyId]]);
      expect(result).toEqual({
        ...updatedJob,
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
      repository.update.mockResolvedValue(updatedJob);
      companyReader.findById.mockResolvedValue({
        ...companyRecord,
        social: {},
        logo: '',
        cover: '',
      });

      const result = await useCase.execute(jobId, updateInput);

      expect(result.company.social).toEqual({});
      expect(result.company.logo).toBe('');
      expect(result.company.cover).toBe('');
    });

    it('should throw NotFoundApplicationError when the job does not exist', async () => {
      repository.update.mockResolvedValue(null);
      const execution = useCase.execute(jobId, updateInput);

      await expect(execution).rejects.toThrow(NotFoundApplicationError);
      await expect(execution).rejects.toThrow('Job not found!');
      expect(repository.update.mock.calls).toEqual([[jobId, updateInput]]);
      expect(companyReader.findById.mock.calls).toEqual([]);
    });

    it('should throw NotFoundApplicationError when the company does not exist', async () => {
      repository.update.mockResolvedValue(updatedJob);
      companyReader.findById.mockResolvedValue(null);
      const execution = useCase.execute(jobId, updateInput);

      await expect(execution).rejects.toThrow(NotFoundApplicationError);
      await expect(execution).rejects.toThrow('Company not found!');
      expect(companyReader.findById.mock.calls).toEqual([[companyId]]);
    });

    it('should propagate repository exceptions', async () => {
      const error = new Error('database unavailable');
      repository.update.mockRejectedValue(error);

      await expect(useCase.execute(jobId, updateInput)).rejects.toThrow(error);
      expect(repository.update.mock.calls).toEqual([[jobId, updateInput]]);
    });
  });
});
