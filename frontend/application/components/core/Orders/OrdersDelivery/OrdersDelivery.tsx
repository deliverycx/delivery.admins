import { FC } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderDelivery } from "domains/useCase/orders/useCase.OrdersDelivery";

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
							
							
                  
              </tbody>
          </table>
	)
}
export default OrdersDelivery