import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { OrganizationfilterModel } from "src/database/mongodbModel/delivery/organizationFilter";
import { OrganizationFilterControllers } from "../controllers/organizationFilter.controller";
import { OrganizationFilterRepository } from "../repository/organizationFilter.repository";
import { OrganizationFilterServises } from "../servises/organizationFilter.servises";

@Module({
  imports: [
		TypegooseModule.forFeature([OrganizationfilterModel], DELIVERY_DB)
  ],
  controllers: [OrganizationFilterControllers], 
  providers:[
		OrganizationFilterServises,
		OrganizationFilterRepository,
	]
})
export class OrganizationFilterModule {}