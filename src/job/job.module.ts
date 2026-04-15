import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from '@src/company/company.module';
import { CreateJobController } from '@src/job/adapters/controllers/create-job.controller';
import { DeleteJobController } from '@src/job/adapters/controllers/delete-job.controller';
import { ListJobController } from '@src/job/adapters/controllers/list-job.controller';
import { ReadJobController } from '@src/job/adapters/controllers/read-job.controller';
import { UpdateJobController } from '@src/job/adapters/controllers/update-job.controller';
import {
  JobEntity,
  JobSchema,
} from '@src/job/infrastructure/persistence/mongoose/schemas/job.schema';
import { jobProviders } from '@src/job/job.providers';

@Module({
  imports: [
    CompanyModule,
    MongooseModule.forFeature([
      {
        name: JobEntity.name,
        schema: JobSchema,
      },
    ]),
  ],
  controllers: [
    ListJobController,
    CreateJobController,
    ReadJobController,
    UpdateJobController,
    DeleteJobController,
  ],
  providers: [...jobProviders],
  exports: [...jobProviders, MongooseModule],
})
export class JobModule {}
