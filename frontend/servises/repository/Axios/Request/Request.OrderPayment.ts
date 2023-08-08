import { IOrderPayment } from "@type";
import axios, { AxiosInstance } from "axios";
import { ApiSuper, methods } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";


type IStatusPayment = {
	id:number,
	token:string
	price?:number
	orderid:string
}

@RequestFabric({
	request:'orderPayment',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestOrderPayment  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	@methods('get')
  getBuOrg(query:string) {
    return this.request(`/orderPayment/all?idorganization=${query}`)
  }

	@methods('get')
  getBuOrder(query:number) {
    return this.request<any>(`/orderPayment/buone?paymentid=${query}`)
  }

	@methods('post')
  getStatusPayment(body:IStatusPayment) {
    return this.request(`/orderPayment/statusPayment`)
  }

	@methods('post')
  confimPayment(body:any) {
    return this.request(`/orderPayment/paymentConfirm`)
  }

	@methods('post')
  canselPayment(body:any) {
    return this.request<any>(`/orderPayment/canselpayment`)
  }

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