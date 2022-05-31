import { Model } from "mongoose";

export class BaseRepository<ModelClass> {
	constructor(
			private readonly model: Model<any>,
	) {}

	async getAll(){
		const result = await this.model.find({})
		return result
	}

	async create<T>(body:T){
		await this.model.create({...body})
	}

	async edit<T>(id:string,body:T,file?:string){
		if(file){
			await this.model.findByIdAndUpdate(id,{...body,images:file}) 
		}else{
			await this.model.findByIdAndUpdate(id,{...body})
		}
		
	}
	async delete(id:string){
		await this.model.findOneAndDelete({
			_id:id
		})
	}
	
}
