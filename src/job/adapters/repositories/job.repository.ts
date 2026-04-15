import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { CreateJobRepositoryInterface } from '@src/job/applications/contracts/create-job.repository-interface';
import type { DeleteJobRepositoryInterface } from '@src/job/applications/contracts/delete-job.repository-interface';
import type {
  JobPayload,
  UpdateJobPayload,
} from '@src/job/applications/contracts/job-payload.interface';
import type { JobRecord } from '@src/job/applications/contracts/job-record.interface';
import type {
  ListJobRepositoryInterface,
  ListJobRepositoryResult,
} from '@src/job/applications/contracts/list-job.repository-interface';
import type { ListJobsQueryInterface } from '@src/job/applications/contracts/list-job-query.interface';
import type { ReadJobRepositoryInterface } from '@src/job/applications/contracts/read-job.repository-interface';
import type { UpdateJobRepositoryInterface } from '@src/job/applications/contracts/update-job.repository-interface';
import {
  JobEntity,
  type JobDocument,
} from '@src/job/domains/schemas/job.schema';
import { Model } from 'mongoose';

@Injectable()
export class JobRepository
  implements
    ListJobRepositoryInterface,
    CreateJobRepositoryInterface,
    ReadJobRepositoryInterface,
    UpdateJobRepositoryInterface,
    DeleteJobRepositoryInterface
{
  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobDocument>,
  ) {}

  async create(data: JobPayload): Promise<JobRecord> {
    try {
      const job = await this.jobModel.create(data);

      return this.toRecord(job);
    } catch (error) {
      this.handleDuplicateKeyError(error);
      throw error;
    }
  }

  async list(
    filters: ListJobsQueryInterface,
  ): Promise<ListJobRepositoryResult> {
    const page = Number(filters.page ?? 1);
    const limit = Number(filters.limit ?? 10);
    const currentPage = page > 0 ? page : 1;
    const itemsPerPage = limit > 0 ? limit : 10;

    const query = {
      ...(filters.id && { _id: filters.id }),
      ...(filters.companyId && { companyId: filters.companyId }),
      ...(filters.isPaidAdvertising !== undefined && {
        isPaidAdvertising: filters.isPaidAdvertising,
      }),
      ...(filters.slug && { slug: { $regex: filters.slug, $options: 'i' } }),
      ...(filters.title && { title: { $regex: filters.title, $options: 'i' } }),
      ...(filters.slots !== undefined && { slots: filters.slots }),
      ...(filters.cover && { cover: { $regex: filters.cover, $options: 'i' } }),
      ...(filters.role && { role: filters.role }),
      ...(filters.status && { status: filters.status }),
    };

    const sortBy = filters.sortBy ?? 'createdAt';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;

    const [jobs, totalItems] = await Promise.all([
      this.jobModel
        .find(query)
        .sort({ [sortBy]: sortOrder })
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .exec(),
      this.jobModel.countDocuments(query).exec(),
    ]);

    return {
      data: jobs.map((job) => this.toRecord(job)),
      totalItems,
      currentPage,
      itemsPerPage,
    };
  }

  async findById(id: string): Promise<JobRecord | null> {
    const job = await this.jobModel.findById(id).exec();

    return job ? this.toRecord(job) : null;
  }

  async update(id: string, data: UpdateJobPayload): Promise<JobRecord | null> {
    try {
      const job = await this.jobModel
        .findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .exec();

      return job ? this.toRecord(job) : null;
    } catch (error) {
      this.handleDuplicateKeyError(error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.jobModel.findByIdAndDelete(id).exec();

    return Boolean(result);
  }

  private handleDuplicateKeyError(error: unknown): void {
    if (
      typeof error !== 'object' ||
      error === null ||
      !('code' in error) ||
      error.code !== 11000
    ) {
      return;
    }

    const duplicatedFields =
      'keyPattern' in error &&
      typeof error.keyPattern === 'object' &&
      error.keyPattern !== null
        ? Object.keys(error.keyPattern)
        : [];

    if (duplicatedFields.includes('slug')) {
      throw new ConflictException('slug already exists');
    }

    throw new ConflictException('duplicate unique field');
  }

  private toRecord(document: JobDocument): JobRecord {
    return {
      id: document._id.toString(),
      companyId: document.companyId,
      slug: document.slug,
      title: document.title,
      slots: document.slots,
      cover: document.cover,
      benefits: {
        salary: document.benefits.salary ?? null,
        transportation: document.benefits.transportation,
        alimentation: document.benefits.alimentation,
        health: document.benefits.health,
        parking: document.benefits.parking,
        bonus: document.benefits.bonus,
      },
      isPaidAdvertising: document.isPaidAdvertising,
      role: document.role,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
