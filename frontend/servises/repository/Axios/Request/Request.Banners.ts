import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from '../Fabric/FabricApi';

@RequestFabric({
	request:'mainbanner',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestBanners  extends ApiSuper {
	CRUDFabric!:CRUDFabric

}

export default new RequestBanners()
