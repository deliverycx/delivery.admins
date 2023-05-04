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
  getOrderBuOrg(query:string) {
    return this.request(`/orderPayment/all?idorganization=${query}`)
  }

	

	
}

export default new RequestOrdersDelivery()