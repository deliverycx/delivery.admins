import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { SocialModel } from "src/database/mongodbModel/admin/social.model";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { OrganizationRepository } from "src/domain/repository/organization.repository";
import { OrganizationSettingServises } from "../servises/organizationSetting.servises";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import {OrganizationGoodPlace} from "../../../../database/mongodbModel/delivery/organizationGoodPlace";
import {OrganizationGoodPlaceControllers} from "../controllers/organizationGoodPlace.controller";
import {OrganizationGoodPlaceServises} from "../servises/organizationGoodPlace.services";
import { OrganizationGoodPlaceRepository } from "../repository/organizationGoodPlace.repository";


@Module({
    imports: [
        TypegooseModule.forFeature([OrganizationClass,CityClass,OrganizationGoodPlace], DELIVERY_DB),
        TypegooseModule.forFeature([OrganizationStatusClass], DELIVERY_DB),
        TypegooseModule.forFeature([SocialModel], ADMIN_DB)
    ],
    controllers: [OrganizationGoodPlaceControllers],
    providers:[
        OrganizationGoodPlaceServises,
        OrganizationGoodPlaceRepository,
        OrganizationRepository,
        OrganizationSettingServises
    ]
})
export class OrganizationGoodPlaceModule {}