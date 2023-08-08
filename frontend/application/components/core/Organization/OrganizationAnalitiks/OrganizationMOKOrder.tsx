import { IOrganization } from "@type"
import { FC } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganizationMOKOrger } from "domains/useCase/organization/useCase.OrganizationAnalitiks";

type IProps = {
	organization:IOrganization
}
const OrganizationMOKOrder:FC<IProps> = ({organization}) =>{
	const useCase = adapterComponentUseCase(useOrganizationMOKOrger,organization)
	const {createdOrder,statusOrders} = useCase.data
	const {handlerMOKorder,handlerStatusOrder,setStatusInput} = useCase.handlers

	console.log(createdOrder);
	return(
		<>
		<div className="card-footer">
			
			<h4>Проверка точки</h4>
			<div className="col-2 btn btn-primary" onClick={handlerMOKorder}>сделать тестовый заказ</div>
			{
				createdOrder && 
					<pre>
					<span>статус:</span> {createdOrder.orderInfo.creationStatus} <br />
					<span>ид заказа:</span> {createdOrder.orderInfo.id}
					<br />
					<span>тело:</span>
					{
						JSON.stringify(createdOrder)
					}
					</pre>
			}
			
		</div>
		<div className="card-footer">
			<h4>Стасус заказа</h4>
			<section>
				<input type="text" defaultValue={createdOrder && createdOrder.orderInfo.id} onChange={e => setStatusInput(e.target.value)} />
				<div className="col-2 btn btn-primary" onClick={handlerStatusOrder}>проверить заказ</div>
			</section>
			{
				statusOrders &&

				
				<pre>
					<span>статус</span> : {statusOrders.creationStatus}<br />
					<span>ошибки</span> : {JSON.stringify(statusOrders.errorInfo)} <br />
					<span>тело</span> :
					{
						JSON.stringify(statusOrders)
					}
				</pre>
			}
		</div>
		</>
		
	)
}
export default OrganizationMOKOrder