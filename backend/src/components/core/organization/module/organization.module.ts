import { Module } from "@nestjs/common";
import { OrganizationPaymentModule } from "./organizationPayment.module";
import { OrganizationRecvisitesModule } from "./organizationRecvisites.module";
import { OrganizationSettingModule } from "./organizationSetting.module";

@Module({
  imports: [
    OrganizationPaymentModule,
		OrganizationSettingModule,
		OrganizationRecvisitesModule
  ]
})
export class OrganizationModule{}