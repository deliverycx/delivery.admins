import { IOrganizationStatus } from "@type"
import { DELIVERY_METODS, ORG_STATUS } from "application/contstans/const.orgstatus"
import { FC } from "react"
import cn from 'classnames';

type IPoprs = {
	organizationStatus:IOrganizationStatus
	swtchStatus:any
}
const OrganizationStatuses:FC<IPoprs> = ({organizationStatus,swtchStatus}) =>{
	const handler = (metod:string) =>{
		swtchStatus('organizationStatus',metod)
	}

	const CN = (status:string) => cn('col-2 btn btn-block', {
		'btn-success':status ===  organizationStatus.organizationStatus
	});
	
	return(
		<div className='card-body'>
			<div className='card-footer'>
        <span className='card-title title_org'>Статусы точки</span>
			<div className="organization_control" >
				<div className={CN(ORG_STATUS.WORK)} onClick={()=> handler(ORG_STATUS.WORK)} >Работает</div>
				<div className={CN(ORG_STATUS.NOWORK)} onClick={()=> handler(ORG_STATUS.NOWORK)}>Не работает</div>
				<div className={CN(ORG_STATUS.NODELIVERY)} onClick={()=> handler(ORG_STATUS.NODELIVERY)}>Нет онлайн заказа</div>
				<div className={CN(ORG_STATUS.OPEN)} onClick={()=> handler(ORG_STATUS.OPEN)}>Открытие</div>
			</div>
			</div>
		</div>
	)
}
export default OrganizationStatuses