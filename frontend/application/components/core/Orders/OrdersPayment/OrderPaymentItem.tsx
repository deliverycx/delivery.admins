import { IOrderPayment } from "@type"
import { FC, useContext } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderPaymentItem } from "domains/useCase/orders/useCase.OrderPayment";
import { OrderStatus, PaymentStatuses } from "application/contstans/order.const";
import { useRouter } from "next/router";

type IProps = {
	order:IOrderPayment
}

const OrderPaymentItem:FC<IProps> = ({order}) =>{
	const useCase = adapterComponentUseCase(useOrderPaymentItem,order)
	const {statePaymentItem} = useCase.data

	const router = useRouter()


	return(
		<tr>
											<td className="project-state">
											{
												(router.asPath == '/managers')
												? <a href={`/managers/orderPayment/${order.paymentid}?organization=${order.idorganization}`}>
                              {order.orderNumber}
                          </a>
												: <a href={`/order/orderPayment/${order.paymentid}?organization=${order.idorganization}`}>
													{order.orderNumber}
											</a>	
											}
											
											</td>
                      <td>
														{order.paymentid}
													<br/>
                          <small>
                              {order.paymentparams.date}
                          </small>
                      </td>
                      <td>
                          <a>
													{order.paymentAmount}
                          </a>
                          
                      </td>
											<td>
                          <a>
													{order.orderId}
                          </a>
                          
                      </td>
                      <td>
													{
														order.paymentparams.phone
													}
                      </td>
                      <td className="project-state">
													{
													 `${order.paymentparams.address_street} ${order.paymentparams.address_home}`

													}
                          
                      </td>
                      <td className="project-state">
													<span className="badge badge-info">{OrderStatus[order.orderStatus]}</span>
													
                          
                      </td>
                      
                  </tr>
	)
}
export default OrderPaymentItem