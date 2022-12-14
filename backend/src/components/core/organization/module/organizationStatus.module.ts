import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import { OrganizationStatusControllers } from "../controllers/organizationStatus.controller";
import { OrganizationStatusRepository } from "../repository/organizationStatus.repository";
import { OrganizationStatusServises } from "../servises/organizationStatus.servises";

@Module({
  imports: [
    TypegooseModule.forFeature([OrganizationStatusClass], DELIVERY_DB),
  ],
  controllers: [OrganizationStatusControllers], 
  providers:[OrganizationStatusServises,OrganizationStatusRepository]
})
export class OrganizationStatusModule {}