import { Inject, Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";
import { BaseServises } from "src/services/base.services";
import { BannerRepository } from "../repository/banner.repository";

@Injectable()
export class mainBannerServises extends BaseServises{
	constructor(
		@Inject(BannerRepository)
		private readonly Repository: typeof BannerRepository
	) {
		super(Repository);
	}
	
}