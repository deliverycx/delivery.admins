import { AxiosInstance } from "axios";
import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";


@RequestFabric({
	request:'display',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})

class RequestDisplay  extends ApiSuper {
	CRUDFabric:CRUDFabric

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

	filterBu(data:{filter:string[]}){
		return this.api({
			method: 'post',
			url: `/display/filter`,
			data
		})
	}

}

export default new RequestDisplay()