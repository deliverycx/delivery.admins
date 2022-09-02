import { Inject, Injectable } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { DisplayBannerRepository } from "../repository/displayBanner.repository";


@Injectable()
export class DisplayBannerServises extends BaseServises{
	constructor(
		@Inject(DisplayBannerRepository)
		private readonly Repository
	) {
		super(Repository);
	}

	getGroop(){
		return this.Repository.getGroopsBannes()
	}
	
}