import { IDisplayBanner, IOrderPayment } from "@type"
import { useFromsCRUD } from "application/hooks/useFormsCRUD"
import { OrderPaymentReducer, initialStateOrderPayment,ReducerActionType } from "application/reducers/OrderPaymentReducer";
import { useState, useEffect, useReducer } from "react"
import { RequestOrderPayment, RequestOrganization } from "servises/repository/Axios/Request";
import { requestOrganizationPayment } from "servises/repository/Axios/Request/Request.OrganizationPayment";
import { useRouter } from 'next/router';
import axios from 'axios';

export function useOrderPaymentItem(this: any,order:IOrderPayment) {
	const [statePaymentItem, dispatchPaymentItem] = useReducer(
    OrderPaymentReducer,
    initialStateOrderPayment
  );

	useEffect(()=>{
		init()
	},[order._id])
	

	const init = async () =>{
		try {
			const {data:org}:any = await RequestOrganization.getBu({idorganization:order.idorganization})
			console.log(org);

			dispatchPaymentItem({
				type: ReducerActionType.setOrganization,
				payload: org.address.street
			});
		} catch (error) {
			
		}
	}


	this.data({
    statePaymentItem
  })
  this.handlers({
    
  })
  this.status({
    
  })
}

export function useOrderPaymentCart(this: any,id:number) {
	const router = useRouter()
	const [barpay,setBarPay] = useState<any>(null)
	const [statePaymentItem, dispatchPaymentItem] = useReducer(
    OrderPaymentReducer,
    initialStateOrderPayment
  );

	const organization = router.query.organization

	useEffect(()=>{
		if(id && organization){
			init(organization as string)
		}
		
	},[id,organization])


	useEffect(()=>{
		(async()=>{
			 if(statePaymentItem.token){
					 
				await statusPayment(id)
				await	getOrder()
			 }
		 })()
		 
		 
	 },[statePaymentItem.token,statePaymentItem.tokenBar])

	 //console.log(statePaymentItem);

	const init = async (organization:string) =>{
		try {
			const {data:org}:any =  await RequestOrganization.getBu({idorganization:organization})
			const {data:payorg} = await requestOrganizationPayment.findBuOrg({organization})

			payorg.forEach((val:any) => {
				if(val.typemagaz == 'ip'){
					dispatchPaymentItem({
						type: ReducerActionType.setToken,
						payload: val.token
					});
				}else if(val.typemagaz == 'ooo'){
					dispatchPaymentItem({
						type: ReducerActionType.setTokenBar,
						payload: val.token
					});
				}
			});
			dispatchPaymentItem({
				type: ReducerActionType.setOrganization,
				payload: org.address.street
			});
			

		} catch (error) {
			console.log(error);
		}
	}

	const getOrder = async () =>{
		try {
			const {data} = await RequestOrderPayment.getBuOrder(id)
			dispatchPaymentItem({
				type: ReducerActionType.setOrder,
				payload: data
			});
			
			if(data.dyalPayment.BarPaymentid && statePaymentItem.tokenBar){
				const barPay = await statusPayment(Number(data.dyalPayment.BarPaymentid),statePaymentItem.tokenBar)
				dispatchPaymentItem({
					type: ReducerActionType.setBarPayment,
					payload: barPay
				});
			}
		} catch (error) {
			
		}
	}

	const statusPayment = async (payid:number,token?:string) =>{
		try {
			const {data} = await RequestOrderPayment.getStatusPayment({
				id:payid,
				token:token || statePaymentItem.token
			})
			//console.log(payid,statePaymentItem.token,token);
			return data
		} catch (error) {
			console.log(error);
		}
	}

	const successPayment = async (id:number,price:number,token?:string) =>{
		try {
			await RequestOrderPayment.confimPayment({
				id,
				token:token || statePaymentItem.token,
				price
			})
			router.reload()
		} catch (error) {
			console.log(error);
		}
	}

	const canselPayment = async (id:number,token?:string) =>{
		try {
			console.log(token);
			await RequestOrderPayment.canselPayment({
				id,
				token:token || statePaymentItem.token,
			})
			router.reload()
		} catch (error) {
			console.log(error);
		}
	}

	const handlerReturns = async (order:IOrderPayment) =>{
		
		try {
			if(statePaymentItem.token){
				dispatchPaymentItem({
					type: ReducerActionType.setReturns,
					payload: true
				});
				const response = await RequestOrderPayment.returnPamyMent({token:statePaymentItem.token,order:order})
				if(response.data.error){
					dispatchPaymentItem({
						type: ReducerActionType.setError,
						payload: response.data.error
					});
				}

			}
		} catch (error) {
			
		}
	}

	const checkReturns = async (id:number) => {
		try {
			const result = await RequestOrderPayment.checkReturns(id,statePaymentItem.token)
			console.log('проверка возв',result);
		} catch (error) {
			
		}
	}

	const refresh = () =>{
		router.reload()
	}


	this.data({
		
    statePaymentItem
  })
  this.handlers({
    handlerReturns,
		refresh,
		canselPayment,
		successPayment
  })
  this.status({
    
  })
}