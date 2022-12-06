import { ApiSuper, methods } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";

@RequestFabric({
	request:'organizationTables',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestOrganizationTables  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	@methods('get')
  getTables(query:string) {
    return this.request(`/organizationTables/IIkkoTable/?idorganization=${query}`)
  }

	@methods('post')
  addTable(body:any) {
    return this.request(`/organizationTables/addtable`)
  }
}
export default new RequestOrganizationTables()