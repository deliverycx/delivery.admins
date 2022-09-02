import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { Model, Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { DisplayBannerModel } from "src/database/mongodbModel/admin/displayBanner.model";
import { GroopsModel } from "src/database/mongodbModel/admin/groops.model";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class GroopsRepository extends BaseRepository<MainBannerModel>{
	constructor(
    @InjectModel(GroopsModel) private readonly Model: ReturnModelType<typeof GroopsModel>,
  ) {
		super(Model)
	 }

	async getGroopsBannes(){
		const res = await this.Model
			.find({ 'groopbanner':{ $in:['63108a0d0ae175af986b14c3','6310da3bc2e8458448c21ed3']}})
			//.populate("groopbanner")
			.populate({ 
        path : 'groopbanner',
        populate : { path : 'groop'}//to find friends of friends
    	})
      .lean();
		console.log('res',res);
		return res
	}
}