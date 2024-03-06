import { useEffect } from 'react';
import RequestOrdersDelivery from 'servises/repository/Axios/Request/Request.OrdersDelivery';
import { useState } from 'react';
import { RequestOrganization } from 'servises/repository/Axios/Request';

export function useOrderDelivery(this: any,organization:string) {
	const [orderList,setOrderList] = useState<any>(null)

	const getOrders = async (organization:string,limit?:number) =>{
		try {
			const {data} = await RequestOrdersDelivery.getOrderBuOrg(organization,limit)

			if(data){
				setOrderList(data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		getOrders(organization,30)
	},[organization])

	//console.log(orderList);
	
	const handlerLimit = (count:number) =>{
		getOrders(organization,count)
	}

	const handlerBuErrors = async () =>{
		try {
			const {data} = await RequestOrdersDelivery.getOrderBuError()

			if(data){
				setOrderList(data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	this.data({
    orderList,
		organization
  })
  this.handlers({
    handlerLimit,
		handlerBuErrors,
		getOrders
  })
  this.status({
    
  })
}