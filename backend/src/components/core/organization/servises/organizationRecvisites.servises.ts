import { Inject, Injectable } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { OrganizationRecvisitesRepository } from "../repository/organizationRecvisites.repository";


@Injectable()
export class OrganizationRecvisitesServises extends BaseServises{
  constructor(
		@Inject(OrganizationRecvisitesRepository)
		private readonly Repository
	) {
		super(Repository);
	}
	
	metodFindBuOrg(body:any){
		return this.Repository.findBuOrg(body)
	}
	
	metodSwitchPayMent(id:string,body:any){
		this.Repository.stwitchPayMent(id,body)
	}

}