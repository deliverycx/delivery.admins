import { useEffect, useState } from "react";
import { RequestOrganization } from "servises/repository/Axios/Request";
import { IOrganization } from '@type';
import { format } from 'date-fns'
import RequestOrdersDelivery from "servises/repository/Axios/Request/Request.OrdersDelivery";

export function useOrganizationAnalitiks(this: any,id:string) {


	this.data({

  })
  this.handlers({
   
  })
  this.status({
    
  })
}

export function useOrganizationMOKOrger(this: any,organization:IOrganization) {
	const [sity,setSity] = useState<string>('')
	const [statusInput,setStatusInput] = useState<string>('')
	const [createdOrder,setCreatedOrder] = useState<any>(null)
	const [statusOrders,setStatusOrders] = useState<any>(null)

	const createBody = {
		organization: organization.id,
		name: "test",
		date:`${format(new Date(), 'yyyy-MM-dd')} ${new Date().toLocaleTimeString()}`,
		address: {
				city: sity,
				street: "",
				home: "1",
				flat: "2",
				intercom: "3",
				entrance: "4",
				floor: "5",
				kladrid:"91000007000034900",
				cordAdress:[]
		},
		
		orderType: "COURIER",
		phone: "+7 978 755 46 54",
		comment: "тестовый заказ с сайта",
		paymentMethod: "CASH",
		localhost:`${document.location.protocol}//${document.location.host}`,
		orderTable:null,
	}
	//console.log(createBody);

	const getSiti = async () =>{
		try {
			const {data} = await RequestOrganization.getCityBu(organization.city)
			if(data){
				setSity(data.name)
			}
		} catch (error) {
			console.log(error);
		}
		
	}


	const handlerMOKorder = async () =>{
		try {
			const {data} = await RequestOrdersDelivery.mokOrder(createBody)
			if(data){
				setCreatedOrder(data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handlerStatusOrder =  async (body:any) =>{
		try {
			
			const {data} = await RequestOrdersDelivery.statusOrder({
				orderid:statusInput,
				organization:organization.id
			})
			if(data){
				setStatusOrders(data)
			}

		} catch (error) {
			console.log(error);
		}
	}


	useEffect(()=>{
		organization && getSiti()
	},[organization])

	useEffect(()=>{
		createdOrder && setStatusInput(createdOrder.orderInfo.id)
	},[createdOrder])

	
	this.data({
		createBody,
		createdOrder,
		statusOrders
  })
  this.handlers({
		handlerMOKorder,
		handlerStatusOrder,
		setStatusInput
  })
  this.status({
    
  })
}