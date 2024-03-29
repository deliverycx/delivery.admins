import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { SocialModel } from "src/database/mongodbModel/admin/social.model";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { CategoryClass } from "src/database/mongodbModel/delivery/category.model";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { ProductClass } from "src/database/mongodbModel/delivery/product.model";
import { OrganizationRepository } from "src/domain/repository/organization.repository";
import { OrganizationControllers } from "../controllers/organization.controller";
import { OrganizationSettingControllers } from "../controllers/organizationSetting.controller";
import { OrganizationServises } from "../servises/organization.servises";
import { OrganizationSettingServises } from "../servises/organizationSetting.servises";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import { IIkoAxios } from "src/repository/iiko/iiko.axios";
import { OrganizationfilterModel } from "src/database/mongodbModel/delivery/organizationFilter";
import { RedisModules } from "src/module/redis.module";

@Module({
  imports: [
    TypegooseModule.forFeature([OrganizationClass,CityClass], DELIVERY_DB),
		TypegooseModule.forFeature([OrganizationStatusClass], DELIVERY_DB),
		TypegooseModule.forFeature([OrganizationfilterModel], DELIVERY_DB),
		TypegooseModule.forFeature([SocialModel], ADMIN_DB),
		RedisModules
  ],
  controllers: [OrganizationControllers,OrganizationSettingControllers], 
  providers:[OrganizationServises,OrganizationRepository,OrganizationSettingServises,IIkoAxios]
})
export class OrganizationSettingModule {}