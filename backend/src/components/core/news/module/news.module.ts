import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { NewsRepository } from "../repository/news.repository";
import { NewsServises } from "../servises/news.servises";
import { NewsControllers } from "../controllers/news.controller";
import { NewsModel } from "src/database/mongodbModel/admin/news.model";


@Module({
  imports: [
    TypegooseModule.forFeature([NewsModel], ADMIN_DB)
  ],
  controllers: [NewsControllers], 
  providers:[NewsServises,NewsRepository]
})
export class NewsModule{}