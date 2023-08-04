import { ApiSuper } from "../AxiosApi"
import { CRUDFabric } from "../Fabric/CRUD.fabric"
import { RequestFabric } from "../Fabric/FabricApi"

@RequestFabric({
	request:'counterhinkal',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestOrganizationCount  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	findBuOrg(data:{organization:string}){
		return this.api({
			method: 'post',
			url: `/counterhinkal/setcount`,
			data
		})
		
	}
}