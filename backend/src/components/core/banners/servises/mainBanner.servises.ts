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
		private readonly Repository
	) {
		super(Repository);
	}

	setImages(id:string,{images}){
		return this.Repository.reverseImages(id,images)
	}
	async create<T>(body:T,files?:any[]){
		const imagesMass = files.reduce((acc,images) => {
			if(images.fieldname === 'files'){
				acc.images.push(images.originalname)
			}else if(images.fieldname === 'smallfilee'){
				acc.smallimages.push(images.originalname)
			}

			return acc
		},{
			images:[],
			smallimages:[]
		});

		this.Repository.create({...body,images:imagesMass.images,smallimages:imagesMass.smallimages})
	}
	async edit<T>(body:any,id:string,files?:any[]){
		const imagesMass = files.reduce((acc,images) => {
			if(images.fieldname === 'files'){
				acc.images.push(images.originalname)
			}else if(images.fieldname === 'smallfilee'){
				acc.smallimages.push(images.originalname)
			}

			return acc
		},{
			images:[],
			smallimages:[]
		});

		this.Repository.edit(id,{...body,images:imagesMass.images,smallimages:imagesMass.smallimages})
	}
	
}