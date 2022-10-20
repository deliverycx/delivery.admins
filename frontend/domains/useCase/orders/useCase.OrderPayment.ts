import { IDisplayBanner, IOrderPayment } from "@type"
import { useFromsCRUD } from "application/hooks/useFormsCRUD"
import { OrderPaymentReducer, initialStateOrderPayment,ReducerActionType } from "application/reducers/OrderPaymentReducer";
import { useState, useEffect, useReducer } from "react"
import { RequestOrderPayment, RequestOrganization } from "servises/repository/Axios/Request";
import { requestOrganizationPayment } from "servises/repository/Axios/Request/Request.OrganizationPayment";
import { useRouter } from 'next/router';

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

export function useOrderPaymentCart(this: any,id:string) {
	const router = useRouter()
	const [statePaymentItem, dispatchPaymentItem] = useReducer(
    OrderPaymentReducer,
    initialStateOrderPayment
  );


	const fomrdata = (value:any) => value
	const [data,{onSubmit,onDelet,setData,getAll,getBu}] = useFromsCRUD<IOrderPayment>(
		fomrdata,RequestOrderPayment.CRUDFabric,'/order/orderPayment',id)
	

	useEffect(()=>{
		data && init(data)
	},[data])

	const init = async (order:IOrderPayment) =>{
		try {
			const {data:org}:any = await RequestOrganization.getBu({idorganization:order.idorganization})
			const {data:payorg} = await requestOrganizationPayment.findBuOrg({organization:org._id})
			
			dispatchPaymentItem({
				type: ReducerActionType.setOrganization,
				payload: org.address.street
			});
			dispatchPaymentItem({
				type: ReducerActionType.setToken,
				payload: payorg.token
			});
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
				getBu(id)
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
		data,
    statePaymentItem
  })
  this.handlers({
    handlerReturns,
		refresh,
		onDelet
  })
  this.status({
    
  })
}