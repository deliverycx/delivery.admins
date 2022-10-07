import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";
import { MainBannerControllers } from "../controllers/mainBanner.controller";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { mainBannerServises } from "../servises/mainBanner.servises";
import { BannerRepository } from "../repository/banner.repository";
import { GroopsModel } from "src/database/mongodbModel/admin/groops.model";
import { GroopsControllers } from "../controllers/groops.controller";
import { GroopsRepository } from "../repository/groops.repository";
import { GroopsServises } from "../servises/groops.servises";
import { DisplayBannerModel } from "src/database/mongodbModel/admin/displayBanner.model";

@Module({
  imports: [
    TypegooseModule.forFeature([GroopsModel], ADMIN_DB),
		TypegooseModule.forFeature([DisplayBannerModel], ADMIN_DB)
  ],
  controllers: [GroopsControllers], 
  providers:[GroopsServises,GroopsRepository]
})
export class GroopsModule{}