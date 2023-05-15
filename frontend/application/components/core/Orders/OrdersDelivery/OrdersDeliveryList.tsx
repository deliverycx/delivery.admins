import { OrderCreationStatus } from "application/contstans/order.const";
import { FC } from "react"

type IProps = {
	orderList:any
}

const OrdersDeliveryList:FC<IProps> = ({orderList}) => {
	console.log(orderList);


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
				<a href={`/order/ordersDelivery/${orderList.orderId}`} >{orderList.orderId}</a>
				
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
					`${orderList.orderParams.address.street}, ${orderList.orderParams.address.home}`
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

			</td>
			

		</tr>
	)
}
export default OrdersDeliveryList