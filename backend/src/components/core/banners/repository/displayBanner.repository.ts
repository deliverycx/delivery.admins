import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { Model, Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { DisplayBannerModel } from "src/database/mongodbModel/admin/displayBanner.model";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class DisplayBannerRepository extends BaseRepository<MainBannerModel>{
	constructor(
    @InjectModel(DisplayBannerModel) private readonly Model: ReturnModelType<typeof DisplayBannerModel>,
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

	async getAll(bu: Record<string, any>): Promise<any[]> {
		const res = await this.Model.find(bu)
		.populate({ 
			path : 'groopbanner',
			populate : { path : 'banners'}//to find friends of friends
		})
		.populate("banners")
		.select('-__v')
		.lean()
		return res
	}
	async getOneBuId(id: string, populate?: string): Promise<any> {
		const res = await this.Model.findById(id)
		.populate({ 
			path : 'groopbanner',
			populate : { path : 'banners'}//to find friends of friends
		})
		.populate("banners")
		.select('-__v')
		.lean()
		return res
	}

	async addBaanerGroop(id:string,{field,banner}){
		console.log(id,field);
		const res =
		field === 'groopbanner' ? await this.Model.findOneAndUpdate(
			{
        _id: id
      },
      {
        $push: {
          groopbanner: banner
        }
      },
      { upsert: true, new: true }
		).populate('banners').lean()
		: await this.Model.findOneAndUpdate(
			{
        _id: id
      },
      {
        $push: {
          banners: banner
        }
      },
      { upsert: true, new: true }
		).populate('banners').lean()
		return res
	}

	async deletBaanerGroop(id:string,{field,banner}){
		console.log('del',id,field);
		const res =
		field === 'groopbanner' ? await this.Model.findOneAndUpdate(
			{
        _id: id
      },
      {
        $pull: {
          groopbanner: banner
        }
      },
      { upsert: true, new: true }
		).populate('banners').lean()
		: await this.Model.findOneAndUpdate(
			{
        _id: id
      },
      {
        $pull: {
          banners: banner
        }
      },
      { upsert: true, new: true }
		).populate('banners').lean()
		return res
	}

	async filterBuGroops (data:string[]){
		const res = await this.Model
			.find({ 'groopbanner':{ $in:data}})
			//.populate("groopbanner")
			.populate({ 
        path : 'groopbanner',
        populate : { path : 'banners'}//to find friends of friends
    	})
      .lean();
		return res
	}
}