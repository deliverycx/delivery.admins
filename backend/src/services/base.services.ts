import { Injectable } from "@nestjs/common";


export class BaseServises{
	constructor(
		private readonly repozitory
	){}
	
	async getAll(query:any = {},populate?:string){
		return this.repozitory.getAll(query,populate)
	}
	async getOne(query?:any,populate?:string){
		return this.repozitory.getOne(query,populate)
	}
	async getBuAll(id:string,populate?:string){
		return this.repozitory.getOne(id,populate)
	}
	async getOneBuId(id:string,populate?:string){
		return this.repozitory.getOneBuId(id,populate)
	}
	async create<T>(body:T,files?:any[]){
		console.log(this.repozitory);
		if(files){
			const imagesMass = files.reduce((acc,images) => {
			acc.push(images.originalname)
				return acc
			},[]);
			this.repozitory.create({...body,images:imagesMass})
		}else{
			this.repozitory.create(body)
		}
		
	}
	async edit(body:any,id:string,files?:any[]){
		if(files){
			const imagesMass = files.reduce((acc,images) => {
				acc.push(images.originalname)
				return acc
			},[]);
			this.repozitory.edit(id,{...body,images:imagesMass})
		}else{
			this.repozitory.edit(id,body)
		}
		
	}
	async delete(id:string){
		this.repozitory.delete(id)
	}
}