import { Model } from "mongoose";

export class BaseRepository<ModelClass> {
	constructor(
			private readonly model: Model<any>,
	) {}

	async getOne(bu:any){
		const result = await this.model.findOne(bu).select('-__v')
		return result
	}
	async getOneBuId(id:string){
		const result = await this.model.findById(id).select('-__v')
		return result
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
