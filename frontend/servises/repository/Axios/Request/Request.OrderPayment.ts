import { IOrderPayment } from "@type";
import axios, { AxiosInstance } from "axios";
import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";


@RequestFabric({
	request:'orderPayment',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestOrderPayment  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	returnPamyMent(data:any){
		return this.api({
			method: 'post',
			url: `/orderPayment/returnPamyMent`,
			data
		})
	}
	checkReturns(id:number,token:string){
		return axios.get(`https://paymaster.ru/api/v2/refunds/${id}`,
		{
			headers: {
					Authorization: `Bearer ${token}`
			}
		}
		)
	}
	
}

export default new RequestOrderPayment()