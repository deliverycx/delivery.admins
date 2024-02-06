import { OrderCreationStatus } from "application/contstans/order.const";
import { FC, useEffect, useState } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request";

type IProps = {
	orderList:any
	userrole:any
}

const OrdersDeliveryList:FC<IProps> = ({orderList,userrole}) => {
	const [org,setOrg] = useState<string>('')
	
	const getOrg = async () =>{
		try {
			const {data} = await RequestOrganization.getBu({
				idorganization:orderList.organization
			})
			if(data && data.address.street){
				setOrg(data.address.street)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		(orderList && orderList.organization) && getOrg()
	},[orderList])

	const orderCreationStatusTSX = () =>{
		switch(orderList.orderStatus){
			case OrderCreationStatus.ERROR
				: return <div className="order_status order_status-error"></div>
			case OrderCreationStatus.PROGRES
				: return <div className="order_status order_status-prependig"></div>
			case OrderCreationStatus.SUCCESS
				: return <div className="order_status order_status-sucses"></div>	
			default
				: return <div className="order_status"></div>		
		}
	}

	return (
		<tr>
			<td className="project-state text-center flex-center">
				{
					orderCreationStatusTSX()
				}
				
			</td>
			<td className="project-state text-center">
				{
					userrole === 'admin'
					? <a href={`/managers/orderPayment/${orderList.orderHash}`} >{orderList.orderId || orderList.orderHash}</a>
					: <a href={`/order/ordersDelivery/${orderList.orderHash}`} >{orderList.orderId || orderList.orderHash}</a>
				}
				
				
			</td>
			<td className="project-state text-center">
				{
					orderList.orderNumber 
					? <a href={`/order/ordersDelivery/${orderList.orderId}`} >{orderList.orderNumber}</a>
					: <span>Неизвестен</span>
				}
				
			</td>
			<td className="project-state text-center">
				{
					org
				}
			</td>
			<td className="project-state text-center">
				{
					orderList.orderParams.address && `${orderList.orderParams.address.street}, ${orderList.orderParams.address.home}`
				}
				<br />
				<small>
					{
						orderList.orderParams.date
					}
					
				</small>
			</td>
			<td className="project-state text-center">
				{orderList.orderParams.phone}

			</td>
			<td className="project-state text-center">
				{orderList.orderParams.orderAmount}
				<br />
				{
					orderList.payment &&
					<div className="badge bg-info">оплата картой</div>
				}	
			</td>
			

		</tr>
	)
}
export default OrdersDeliveryList