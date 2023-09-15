import { ApiSuper, methods } from "../AxiosApi"
import { CRUDFabric } from "../Fabric/CRUD.fabric"
import { RequestFabric } from "../Fabric/FabricApi"

@RequestFabric({
	request:'organizationfilter',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestOrganizationFilter  extends ApiSuper {
	CRUDFabric!:CRUDFabric


}

export default new RequestOrganizationFilter()