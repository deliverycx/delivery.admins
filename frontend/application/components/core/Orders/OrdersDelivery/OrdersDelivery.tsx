import { FC } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderDelivery } from "domains/useCase/orders/useCase.OrdersDelivery";
import OrdersDeliveryList from "./OrdersDeliveryList";

type IProps = {
	organization:string | undefined
}
const OrdersDelivery:FC<IProps> = ({organization}) =>{
	const useCase = adapterComponentUseCase(useOrderDelivery,organization)
	const {orderList} = useCase.data


	return(
		<table className="table table-striped projects">
              <thead>
                  <tr>
											<th  className="text-center">
                          статус заказа
                      </th >
											<th  className="text-center">
                          id заказа
                      </th >
											
											<th className="text-center">
												номер заказа
											</th>
                      <th className="text-center">
                          адресс/время
                      </th>
                      <th className="text-center">
											телефон
                      </th>
											<th className="text-center">
													сумма
                      </th>
                      
                      
                      
                      
                  </tr>
              </thead>
              <tbody>
								{
									orderList && orderList.map((val:any) =>{
										return <OrdersDeliveryList key={val._id} orderList={val} />
									})
									
								}
								
							
                  
              </tbody>
          </table>
	)
}
export default OrdersDelivery