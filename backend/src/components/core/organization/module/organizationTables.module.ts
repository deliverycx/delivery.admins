import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { OrganizationTablesClass } from "src/database/mongodbModel/delivery/organizationTables.model";
import { IIkoAxios } from "src/repository/iiko/iiko.axios";
import { OrganizationTablesControllers } from "../controllers/organizationTables.controller";
import { OrganizationTablesRepository } from "../repository/organizationTables.repository";
import { OrganizationTableServises } from "../servises/organizationTables.servises";

@Module({
  imports: [
    TypegooseModule.forFeature([OrganizationClass,OrganizationTablesClass], DELIVERY_DB),
  ],
  controllers: [OrganizationTablesControllers], 
  providers:[OrganizationTableServises,OrganizationTablesRepository,IIkoAxios]
})
export class OrganizationTablesModule {}