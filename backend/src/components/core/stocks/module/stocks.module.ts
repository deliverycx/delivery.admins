import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { NewsRepository } from "../repository/stocks.repository";
import { NewsServises } from "../servises/stocks.servises";
import { NewsControllers } from "../controllers/stocks.controller";
import { NewsModel } from "src/database/mongodbModel/admin/news.model";
import { StocksModel } from "src/database/mongodbModel/admin/stocks.model";


@Module({
  imports: [
    TypegooseModule.forFeature([StocksModel], ADMIN_DB)
  ],
  controllers: [NewsControllers], 
  providers:[NewsServises,NewsRepository]
})
export class StocksModule{}