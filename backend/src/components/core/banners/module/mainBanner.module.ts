import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";
import { MainBannerControllers } from "../controllers/mainBanner.controller";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { mainBannerServises } from "../servises/mainBanner.servises";
import { BannerRepository } from "../repository/banner.repository";

@Module({
  imports: [
    TypegooseModule.forFeature([MainBannerModel], ADMIN_DB)
  ],
  controllers: [MainBannerControllers], 
  providers:[mainBannerServises,BannerRepository]
})
export class MainBannerModule{}