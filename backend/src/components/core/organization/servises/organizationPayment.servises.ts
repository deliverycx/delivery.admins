import { Inject, Injectable } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { OrganizationPaymentRepository } from "../repository/organizationPayment.repository";

@Injectable()
export class OrganizationPaymentServises extends BaseServises{
  constructor(
		@Inject(OrganizationPaymentRepository)
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