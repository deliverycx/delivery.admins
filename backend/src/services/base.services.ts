import { Injectable } from "@nestjs/common";


export class BaseServises{
	constructor(
		private readonly repozitory
	){}
	
	async getAll(){
		
	}
	async create<T>(body:T){
		this.repozitory.create(body)
	}
	async edit(){

	}
	async delete(){

	}
}