import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { CounterHinkalModel } from "src/database/mongodbModel/admin/counterHi.model";
import { DELIVERY_DB, ADMIN_DB } from "src/database/mongodbModel/config.mongodb";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { organizationCounterControllers } from "../controllers/organizationCounter.controller";
import { OrganizationCounterRepository } from "../repository/organizationCounter.repository";
import { OrganizationCountServises } from "../servises/organizationCounter.servises";

@Module({
  imports: [
		TypegooseModule.forFeature([CounterHinkalModel], ADMIN_DB)
  ],
  controllers: [organizationCounterControllers], 
  providers:[
		OrganizationCounterRepository,
		OrganizationCountServises,
	]
})
export class OrganizationCountModule {}