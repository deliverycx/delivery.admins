import { Module } from "@nestjs/common";
import { OrganizationPaymentModule } from "./organizationPayment.module";
import { OrganizationRecvisitesModule } from "./organizationRecvisites.module";
import { OrganizationSettingModule } from "./organizationSetting.module";
import { OrganizationStatusModule } from "./organizationStatus.module";
import { OrganizationTablesModule } from "./organizationTables.module";
import { OrganizationCountModule } from "./organizationCounter.module";
import { OrganizationFilterModule } from "./organizationFilter.module";
import {OrganizationGoodPlaceModule} from "./OrganizationGoodPlace.module";
import {OrganizationProductModule} from "./OrganizationProduct.module";
import { UnloadModule } from "../../unload/module/unload.module";

@Module({
  imports: [
	  OrganizationPaymentModule,
	  OrganizationSettingModule,
	  OrganizationRecvisitesModule,
	  OrganizationTablesModule,
	  OrganizationStatusModule,
	  OrganizationCountModule,
	  OrganizationFilterModule,
	  OrganizationGoodPlaceModule,
	  OrganizationProductModule,
  ]
})
export class OrganizationModule{}