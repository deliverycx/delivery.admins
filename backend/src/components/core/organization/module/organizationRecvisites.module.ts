import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { SocialModel } from "src/database/mongodbModel/admin/social.model";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { PaymentRecvisitesClass } from "src/database/mongodbModel/delivery/paymentRecvisites.model";
import { OrganizationRepository } from "src/domain/repository/organization.repository";
import { OrganizationRecvisitesControllers } from "../controllers/organizationRecvisites.controller";
import { OrganizationRecvisitesRepository } from "../repository/organizationRecvisites.repository";
import { OrganizationRecvisitesServises } from "../servises/organizationRecvisites.servises";
import { OrganizationSettingServises } from "../servises/organizationSetting.servises";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";


@Module({
  imports: [
    TypegooseModule.forFeature([OrganizationClass,CityClass,PaymentRecvisitesClass], DELIVERY_DB),
		TypegooseModule.forFeature([OrganizationStatusClass], DELIVERY_DB),
		TypegooseModule.forFeature([SocialModel], ADMIN_DB)
  ],
  controllers: [OrganizationRecvisitesControllers], 
  providers:[
		OrganizationRecvisitesServises,
		OrganizationRecvisitesRepository,
		OrganizationRepository,
		OrganizationSettingServises
	]
})
export class OrganizationRecvisitesModule {}