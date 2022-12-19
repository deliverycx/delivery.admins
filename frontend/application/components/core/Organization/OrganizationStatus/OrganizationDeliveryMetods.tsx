import { IOrganizationStatus } from "@type"
import { DELIVERY_METODS } from "application/contstans/const.orgstatus"
import { FC } from "react"
import cn from 'classnames';

type IPoprs = {
	organizationStatus:IOrganizationStatus
	swtchStatus:any
}
const OrganizationDeliveryMetods:FC<IPoprs> = ({organizationStatus,swtchStatus}) =>{

	const handler = (metod:string) =>{
		const res = organizationStatus.deliveryMetod.includes(metod)
		if(res){
			const arr = organizationStatus.deliveryMetod.filter((val:string) => val !== metod)
			swtchStatus('deliveryMetod',arr)
		}else{
			swtchStatus('deliveryMetod',[...organizationStatus.deliveryMetod,metod])
		}
	}

	const CN = (deliv:string) => cn('col-2 btn btn-block', {
		'btn-success':organizationStatus.deliveryMetod.includes(deliv),
	});

	return(
		<div className='card-body'>
			<div className='card-footer'>
        <span className='card-title title_org'>Типы доставки</span>
			<div className="organization_control" >
				<div className={CN(DELIVERY_METODS.COURIER)} onClick={()=> handler(DELIVERY_METODS.COURIER)} >Доставка</div>
				<div className={CN(DELIVERY_METODS.PICKUP)} onClick={()=> handler(DELIVERY_METODS.PICKUP)}>Самовывоз</div>
				<div className={CN(DELIVERY_METODS.ONSPOT)} onClick={()=> handler(DELIVERY_METODS.ONSPOT)}>За столом</div>
			</div>
			</div>
		</div>
	)
}
export default OrganizationDeliveryMetods