import React, { FC, useEffect, useState } from "react";
import RequestOrderPayment from "servises/repository/Axios/Request/Request.OrderPayment";
import OrderPaymentItem from "./OrderPaymentItem";

const OrdersPayment:FC<{organization:string}> = ({organization}) =>{
	const [orders,setOrders] = useState<any>(null)
	useEffect(()=>{
		getAll()

	},[])

	const getAll = async () =>{
		try {
			const {data} = await RequestOrderPayment.getBuOrg(organization)
			//console.log(data);
			data && setOrders(data)
		} catch (error) {
			console.log(error);
		}
	}

	

	return (
		<table className="table table-striped projects">
              <thead>
                  <tr>
											<th>
												номер заказа
											</th>
                      <th >
                          номер платежа
                      </th>
                      <th >
                          сумма
                      </th>
											<th >
                          ид заказа
                      </th>
                      <th >
                          телефон
                      </th>
											<th >
                          адресс
                      </th>
                      
                      <th  className="text-center">
                          статус заказа
                      </th>
                      
                  </tr>
              </thead>
              <tbody>
							{ 
								orders && orders.map((order:any)=>{
									return <OrderPaymentItem key={order._id} order={order} />
								})
								
							}
							
                  
              </tbody>
          </table>
		
	)
}
export default OrdersPayment