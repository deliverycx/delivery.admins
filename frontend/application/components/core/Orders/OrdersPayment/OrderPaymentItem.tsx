import { IOrderPayment } from "@type"
import { FC, useContext } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderPaymentItem } from "domains/useCase/orders/useCase.OrderPayment";
import { OrderStatus, PaymentStatuses } from "application/contstans/order.const";

type IProps = {
	order:IOrderPayment
}

const OrderPaymentItem:FC<IProps> = ({order}) =>{
	const useCase = adapterComponentUseCase(useOrderPaymentItem,order)
	const {statePaymentItem} = useCase.data

	console.log('заказ',order);

	return(
		<tr>
                      <td>
													<a href={`orderPayment/${order._id}`}>
                              {order.paymentid}
                          </a>
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
													<a>
                              {statePaymentItem.organization && statePaymentItem.organization}
                          </a>
													<br/>
                          <small>
                              {order.idorganization}
                          </small>
                      </td>
                      <td className="project-state">
													{
														PaymentStatuses.SUCCESSED === order.paymentStatus &&
														<span className="badge badge-success">оплачено</span>
													}
													{
														
														PaymentStatuses.Return === order.paymentStatus &&
														<span className="badge badge-warning">возврат</span>
													}
													{
														
														PaymentStatuses.REJECTED === order.paymentStatus &&
														<span className="badge badge-danger">отмена</span>
													}
                          
                      </td>
                      <td className="project-state">
													<span className="badge badge-info">{OrderStatus[order.orderStatus]}</span>
													
                          
                      </td>
                      
                  </tr>
	)
}
export default OrderPaymentItem