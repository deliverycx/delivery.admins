import { Module } from "@nestjs/common";
import { OrganizationPaymentModule } from "./organizationPayment.module";
import { OrganizationRecvisitesModule } from "./organizationRecvisites.module";
import { OrganizationSettingModule } from "./organizationSetting.module";
import { OrganizationTablesModule } from "./organizationTables.module";

@Module({
  imports: [
    OrganizationPaymentModule,
		OrganizationSettingModule,
		OrganizationRecvisitesModule,
		OrganizationTablesModule
  ]
})
export class OrganizationModule{}