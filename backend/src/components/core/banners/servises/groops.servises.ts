import { Inject, Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";
import { BaseServises } from "src/services/base.services";
import { BannerRepository } from "../repository/banner.repository";
import { GroopsRepository } from "../repository/groops.repository";

@Injectable()
export class GroopsServises extends BaseServises{
	constructor(
		@Inject(GroopsRepository)
		private readonly Repository
	) {
		super(Repository);
	}

	getGroop(){
		return this.Repository.getGroopsBannes()
	}
	addGroopsBanner({id,banners}){
		return this.Repository.addGroopsBanner(id,banners)
	}
	
}