import { AxiosInstance } from "axios";
import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";


@RequestFabric({
	request:'groops',
	fabric:[CRUDFabric]
})
class RequestGroops  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	addGroopsBanner(data:{id:string,banners:string}){
		return this.api({
			method: 'post',
			url: `/groops/addbanner`,
			data
		})
		
	}

	deletGroopsBanner(data:{id:string,banners:string}){
		return this.api({
			method: 'post',
			url: `/groops/deletebanner`,
			data
		})
		
	}
}

export default new RequestGroops()