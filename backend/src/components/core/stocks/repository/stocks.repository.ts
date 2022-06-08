import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { Model, Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { NewsModel } from "src/database/mongodbModel/admin/news.model";
import { StocksModel } from "src/database/mongodbModel/admin/stocks.model";
import { BaseRepository } from "src/domain/repository/base.repository";


@Injectable()
export class NewsRepository extends BaseRepository<StocksModel>{
	constructor(
    @InjectModel(StocksModel) private readonly Model: ReturnModelType<typeof StocksModel>,
  ) {
		super(Model)
	 }
}