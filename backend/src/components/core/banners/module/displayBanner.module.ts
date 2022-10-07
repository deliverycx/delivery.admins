import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { DisplayBannerModel } from "src/database/mongodbModel/admin/displayBanner.model";
import { DisplayBannerControllers } from "../controllers/displayBanner.controller";
import { DisplayBannerRepository } from "../repository/displayBanner.repository";
import { DisplayBannerServises } from "../servises/displayBanner.servises";

@Module({
  imports: [
		TypegooseModule.forFeature([DisplayBannerModel], ADMIN_DB)
  ],
  controllers: [DisplayBannerControllers], 
  providers:[DisplayBannerServises,DisplayBannerRepository]
})
export class DisplayBannerModule{}