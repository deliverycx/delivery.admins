import { ApiSuper } from "../AxiosApi"
import { CRUDFabric } from "../Fabric/CRUD.fabric"
import { RequestFabric } from "../Fabric/FabricApi"
import RequestDisplay from "./Request.Display"

@RequestFabric({
	request:'dashbord',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})

class RequestDashBord  extends ApiSuper {
	CRUDFabric:CRUDFabric

	switchGuestVip(data:any){
		return this.api({
			method: 'post',
			url: `/dashbord/getVipGuest`,
			data
		})
	}

}

export default new RequestDashBord()