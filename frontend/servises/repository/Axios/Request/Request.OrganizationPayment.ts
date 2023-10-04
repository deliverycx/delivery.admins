import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from '../Fabric/FabricApi';

@RequestFabric({
	request:'organization_payment',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestOrganizationPayment extends ApiSuper {
	CRUDFabric!:CRUDFabric

	findBuOrg(data:{organization:string}){
		return this.api({
			method: 'post',
			url: `/organization_payment/find`,
			data
		})
		
	}
	swtchPamyMent(id:string,data:{isActive:boolean}){
		return this.api({
			method: 'post',
			url: `/organization_payment/switchpay?id=${id}`,
			data
		})
	}
}


@RequestFabric({
	request:'organization_recvisites',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestRecvisitesPayment  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	findBuOrg(data:{organization:string}){
		return this.api({
			method: 'post',
			url: `/organization_recvisites/find`,
			data
		})
		
	}
}

export const requestRecvisitesPayment =  new RequestRecvisitesPayment()
export const requestOrganizationPayment =  new RequestOrganizationPayment()
