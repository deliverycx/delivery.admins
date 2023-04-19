import { IOrganizationStatus } from "@type"
import { DELIVERY_METODS, PAYMENT_METODS } from "application/contstans/const.orgstatus"
import { FC } from "react"
import cn from 'classnames';

type IPoprs = {
	organizationStatus:IOrganizationStatus
	swtchStatus:any
}

const OrganizationPaymentMetods:FC<IPoprs> = ({organizationStatus,swtchStatus}) =>{
	const handler = (metod:string) =>{
		const res = organizationStatus.paymentMetod.includes(metod)
		if(res){
			const arr = organizationStatus.paymentMetod.filter((val:string) => val !== metod)
			swtchStatus('paymentMetod',arr)
		}else{
			swtchStatus('paymentMetod',[...organizationStatus.paymentMetod,metod])
		}
	}

	const CN = (deliv:string) => cn('col-2 btn btn-block', {
		'btn-success':organizationStatus.paymentMetod.includes(deliv),
	});

	return(
		<div className='card-body'>
			<div className='card-footer'>
        <span className='card-title title_org'>Типы оплаты</span>
			<div className="organization_control" >
				<div className={CN(PAYMENT_METODS.CASH)} onClick={()=> handler(PAYMENT_METODS.CASH)} >Наличными</div>
				<div className={CN(PAYMENT_METODS.BYCARD)} onClick={()=> handler(PAYMENT_METODS.BYCARD)}>Картой</div>
				<div className={CN(PAYMENT_METODS.CARD)} onClick={()=> handler(PAYMENT_METODS.CARD)}>Оплата в приложении</div>
			</div>
			</div>
		</div>
	)
}
export default OrganizationPaymentMetods