import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListCompanyController } from '@src/company/adapters/controllers/list-company.controller';
import { CreateCompanyController } from '@src/company/adapters/controllers/create-company.controller';
import { ReadCompanyController } from '@src/company/adapters/controllers/read-company.controller';
import { UpdateCompanyController } from '@src/company/adapters/controllers/update-company.controller';
import { DeleteCompanyController } from '@src/company/adapters/controllers/delete-company.controller';
import {
  CompanyEntity,
  CompanySchema,
} from '@src/company/domains/schemas/company.schema';
import { companyProviders } from '@src/company/company.providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyEntity.name,
        schema: CompanySchema,
      },
    ]),
  ],
  controllers: [
    ListCompanyController,
    CreateCompanyController,
    ReadCompanyController,
    UpdateCompanyController,
    DeleteCompanyController,
  ],
  providers: [...companyProviders],
  exports: [...companyProviders, MongooseModule],
})
export class CompanyModule {}
