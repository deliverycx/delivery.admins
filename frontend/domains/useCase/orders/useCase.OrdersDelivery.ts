import { useEffect } from 'react';
import RequestOrdersDelivery from 'servises/repository/Axios/Request/Request.OrdersDelivery';
import { useState } from 'react';

export function useOrderDelivery(this: any,organization:string) {
	const [orderList,setOrderList] = useState<any>()

	const getOrders = async (organization:string) =>{
		try {
			const {data} = await RequestOrdersDelivery.getOrderBuOrg(organization)
			if(data){
				setOrderList(data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		getOrders(organization)
	},[])


	this.data({
    orderList
  })
  this.handlers({
    
  })
  this.status({
    
  })
}