import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { SocialModel } from "src/database/mongodbModel/admin/social.model";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { PaymentinfosClass } from "src/database/mongodbModel/delivery/paymentinfos.model";
import { OrganizationRepository } from "src/domain/repository/organization.repository";
import { OrganizationPaymentControllers } from "../controllers/organizationPayment.controller";
import { OrganizationPaymentRepository } from "../repository/organizationPayment.repository";
import { OrganizationPaymentServises } from "../servises/organizationPayment.servises";
import { OrganizationSettingServises } from "../servises/organizationSetting.servises";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import { RedisModules } from "src/module/redis.module";

@Module({
  imports: [
    TypegooseModule.forFeature([OrganizationClass,CityClass,PaymentinfosClass], DELIVERY_DB),
		TypegooseModule.forFeature([OrganizationStatusClass], DELIVERY_DB),
		TypegooseModule.forFeature([SocialModel], ADMIN_DB),
		RedisModules
  ],
  controllers: [OrganizationPaymentControllers], 
  providers:[
		OrganizationPaymentServises,
		OrganizationPaymentRepository,
		OrganizationRepository,
		OrganizationSettingServises,
	]
})
export class OrganizationPaymentModule {}