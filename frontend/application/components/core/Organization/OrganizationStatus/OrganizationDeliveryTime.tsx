import { IOrganizationStatus } from "@type"
import { FC } from "react"

type IPoprs = {
	organizationStatus:IOrganizationStatus
	swtchStatus:any
}
const OrganizationDeliveryTime:FC<IPoprs> = ({organizationStatus,swtchStatus}) =>{

	const handlerTime = (event:any) =>{
		const time = event.target.value
		swtchStatus('deliveryTime',time)
	}

	return(
		<div className="card-body">
			<div className="callout callout-success">
				<h5>Время до закрытия доставки</h5>
				<select defaultValue={organizationStatus.deliveryTime} onChange={handlerTime}>
					<option value="30">30 мин</option>
					<option value="60">1 час</option>
					<option value="90">1 час 30 мин</option>
					<option value="120">2 часа</option>
				</select>
			</div>
		</div>
		
	)
}
export default OrganizationDeliveryTime