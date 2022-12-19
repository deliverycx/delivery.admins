import { Injectable } from "@nestjs/common";
import { OrganizationStatusRepository } from "../repository/organizationStatus.repository";



@Injectable()
export class OrganizationStatusServises{
  constructor(private readonly Repository: OrganizationStatusRepository) { }
  
 	getOrgStatus(organization:string){
		return this.Repository.getOrgStatusMetod(organization)
	}

	updateStatus({organization,statusMetod,metod}){
		let setmetod

		switch (statusMetod) {
			case 'deliveryMetod':
				setmetod = { deliveryMetod:metod }
			break;
			case 'organizationStatus': 
				setmetod = { organizationStatus:metod }
			break;
			case 'paymentMetod': 
				setmetod = { paymentMetod:metod }
			break;
	
		}
		return this.Repository.updateStatusMetod(organization,setmetod)
	}

}