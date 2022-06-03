import { Injectable } from "@nestjs/common";


export class BaseServises{
	constructor(
		private readonly repozitory
	){}
	
	async getAll(query:any = {}){
		return this.repozitory.getAll(query)
	}
	async getOne(query?:any){
		return this.repozitory.getOne(query)
	}
	async getOneBuId(id:string){
		return this.repozitory.getOneBuId(id)
	}
	async create<T>(body:T,files?:any[]){
		const imagesMass = files.reduce((acc,images) => {
			acc.push(images.originalname)
			return acc
		},[]);
		this.repozitory.create({...body,images:imagesMass})
	}
	async edit(body:any,id:string,files?:any[]){
		const imagesMass = files.reduce((acc,images) => {
			acc.push(images.originalname)
			return acc
		},[]);
		this.repozitory.edit(id,{...body,images:imagesMass})
	}
	async delete(id:string){
		this.repozitory.delete(id)
	}
}