import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { SocialModel } from "src/database/mongodbModel/admin/social.model";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { OrganizationRepository } from "src/domain/repository/organization.repository";
import { OrganizationSettingServises } from "../servises/organizationSetting.servises";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import {OrganizationHiddenProduct} from "../../../../database/mongodbModel/delivery/hiddenProduct.model";
import {OrganizationProductServices} from "../servises/organizationProduct.services";
import {OrganizationProductRepository} from "../repository/organizationProduct.repository";
import {OrganizationProductController} from "../controllers/organizationProduct.controller";
import { IIkoAxios } from "src/repository/iiko/iiko.axios";
import { RedisModules } from "src/module/redis.module";


@Module({
    imports: [
        TypegooseModule.forFeature([OrganizationClass,CityClass, OrganizationHiddenProduct], DELIVERY_DB),
        TypegooseModule.forFeature([OrganizationStatusClass], DELIVERY_DB),
        TypegooseModule.forFeature([SocialModel], ADMIN_DB),
				RedisModules
    ],
    controllers: [OrganizationProductController],
    providers:[
        OrganizationProductServices,
        OrganizationProductRepository,
        OrganizationRepository,
        OrganizationSettingServises,
				IIkoAxios
    ]
})
export class OrganizationProductModule {}