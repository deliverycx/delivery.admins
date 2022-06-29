import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { Model, Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { NewsModel } from "src/database/mongodbModel/admin/news.model";
import { BaseRepository } from "src/domain/repository/base.repository";


@Injectable()
export class NewsRepository extends BaseRepository<NewsModel>{
	constructor(
    @InjectModel(NewsModel) private readonly Model: ReturnModelType<typeof NewsModel>,
  ) {
		super(Model)
	 }
}