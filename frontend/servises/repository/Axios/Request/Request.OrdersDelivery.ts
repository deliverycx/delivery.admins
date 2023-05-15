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
  getOrderBuOrg(org:string) {
    return this.request(`/orderDelivery/buOrg?organization=${org}`)
  }

	@methods('get')
  getOrderBu(id:string) {
    return this.request(`/orderDelivery/buone?orderId=${id}`)
  }

	
}

export default new RequestOrdersDelivery()