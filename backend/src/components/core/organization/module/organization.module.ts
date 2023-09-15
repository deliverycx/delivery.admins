import { Module } from "@nestjs/common";
import { OrganizationPaymentModule } from "./organizationPayment.module";
import { OrganizationRecvisitesModule } from "./organizationRecvisites.module";
import { OrganizationSettingModule } from "./organizationSetting.module";
import { OrganizationStatusModule } from "./organizationStatus.module";
import { OrganizationTablesModule } from "./organizationTables.module";
import { OrganizationCountModule } from "./organizationCounter.module";
import { OrganizationFilterModule } from "./organizationFilter.module";

@Module({
  imports: [
    OrganizationPaymentModule,
		OrganizationSettingModule,
		OrganizationRecvisitesModule,
		OrganizationTablesModule,
		OrganizationStatusModule,
		OrganizationCountModule,
		OrganizationFilterModule
  ]
})
export class OrganizationModule{}