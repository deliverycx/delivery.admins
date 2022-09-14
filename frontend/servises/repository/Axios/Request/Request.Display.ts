import { AxiosInstance } from "axios";
import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";


@RequestFabric({
	request:'display',
	fabric:[CRUDFabric]
})
class RequestDisplay  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	addBuField(data:{field:string,banner:string},id:string){
		return this.api({
			method: 'post',
			url: `/display/addfield?id=${id}`,
			data
		})
	}
	deleteBuField(data:{field:string,banner:string},id:string){
		return this.api({
			method: 'post',
			url: `/display/deletfield?id=${id}`,
			data
		})
	}

}

export default new RequestDisplay()