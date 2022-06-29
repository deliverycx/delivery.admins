import { Inject, Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";
import { BaseServises } from "src/services/base.services";
import { NewsRepository } from "../repository/news.repository";

@Injectable()
export class NewsServises extends BaseServises{
	constructor(
		@Inject(NewsRepository)
		private readonly Repository: typeof NewsRepository
	) {
		super(Repository);
	}
	
}