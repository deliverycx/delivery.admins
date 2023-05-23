import { Inject } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { NewsRepository } from "../../news/repository/news.repository";
import { DashbordRepository } from "../repository/dashbord.repository";

export class DashbordServises extends BaseServises{
	constructor(
		@Inject(DashbordRepository)
		private readonly Repository:DashbordRepository
	) {
		super(Repository);
	}

	setVipGuest({_id,guestvip}){
		return this.Repository.setVipGuestMetod(_id,guestvip)
	}
	
}