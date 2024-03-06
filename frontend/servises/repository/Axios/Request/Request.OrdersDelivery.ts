import { IOrderPayment } from "@type";
import axios, { AxiosInstance } from "axios";
import { ApiSuper, methods } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";


type IStatusPayment = {
	id:number,
	token:string
	price?:number
}

@RequestFabric({
	request:'orderPayment',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestOrdersDelivery  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	@methods('get')
  getOrderBuOrg(org:string,limits?:number) {
    return this.request(`/orderDelivery/buOrg?organization=${org}&limit=${limits}`)
  }

	getOrderBuError() {
    return this.request(`/orderDelivery/buerrors`)
  }

	@methods('get')
  getOrderBu(id:string) {
    return this.request(`/orderDelivery/buone?orderHash=${id}`)
  }

	@methods('post')
	mokOrder(body:any){
		return this.request(`/orderDelivery/mokorder`)
	}

	@methods('post')
	statusOrder(body:any){
		return this.request(`/orderDelivery/statusOrders`)
	}
}

export default new RequestOrdersDelivery()