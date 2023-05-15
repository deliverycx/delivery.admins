import { Model } from "mongoose";

export class BaseRepository<ModelClass> {
	constructor(
			private readonly model: Model<any>,
	) {}

	async getAll(bu:Record<string,any>,populate?:string){
		if(populate){
			return await this.model.find(bu).populate(populate).select('-__v')
		}else{
			return await this.model.find(bu).select('-__v')
		}
	}
	async getOne(bu:Record<string,any>,populate?:string){
		console.log(bu);
		if(populate){
			return await this.model.findOne(bu).populate(populate).select('-__v')
		}else{
			return await this.model.findOne(bu).select('-__v')
		}
	}
	async getBuAll(bu:Record<string,any>,populate?:string){
		if(populate){
			return await this.model.find(bu).populate(populate).select('-__v')
		}else{
			return await this.model.find(bu).select('-__v')
		}
	}
	async getOneBuId(id:string,populate?:string){
		if(populate){
			return await this.model.findById(id).populate(populate).select('-__v')
		}else{
			return await this.model.findById(id).select('-__v')
		}
	}

	async create<T>(body:T){
		await this.model.create(body)
	}

	async edit<T>(id:string,body:T){
		console.log(id,body);
		await this.model.findByIdAndUpdate(id,body) 
	}
	async delete(id:string){
		await this.model.findOneAndDelete({
			_id:id
		})
	}
	
}
