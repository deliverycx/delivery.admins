import { ApiSuper, methods } from "../AxiosApi"
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

	setCounter(data:any){
		return this.api({
			method: 'post',
			url: `/counterhinkal/setcount`,
			data
		})
		
	}

	@methods('get')
  getOraganizationCount(org:string) {
    return this.request<{_id:string,coutn:number}>(`/counterhinkal/getcount?organization=${org}`)
  }
}
export default new RequestOrganizationCount()