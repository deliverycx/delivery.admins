import { IPoint } from "@type"
import { FC, useEffect, useState } from "react"
import cn from 'classnames';
import { CART_CHOICE } from "application/contstans/cart.const";
import { RequestOrganization } from "servises/repository/Axios/Request";

type IProps = {
	point: IPoint
	handleHiddenOrg:any
}
const OrganizationListCart:FC<IProps> = ({point,handleHiddenOrg}) => {
	const [terminalAlive, setTerminalAlive] = useState<any>()

	const fetchOrgTerminal = async (id:string) => {
    try {
      const { data } = await RequestOrganization.getinfoTerminal({
				idorganization:id
			})
			if(data){
				setTerminalAlive(data)
			}
      
    } catch (error) {
      console.log(error)
    }
  }

	useEffect(()=>{
		point && fetchOrgTerminal(point.id)
	},[point.id])

	const CNhiddenMetod = cn('col-2 btn btn-block', { 'btn-success': point.isHidden });	
	
	return (
		<div key={point.id} className='card-body'>
			<div className='card-footer'>
				<a className='card-title title_org' href={`/organization/${point.id}`}>
					{point.address.street}
					<small> {point.delivMetod === CART_CHOICE.NOWORK && ' - Онлайн-заказ не доступен'}</small>
					
					
				</a>
				<div className="dispdel">
						{
							terminalAlive && terminalAlive.isAlive 
							? <small><div className="order_status order_status-sucses"></div>  терминал активен</small>
							: <small><div className="order_status order_status-error"></div> терминал недоступен</small>
						}
					</div>
				<div className="organization_control organization_control-box" >
					<section>
						<div className="text-danger">{point.isHidden && 'точка скрыта'}</div>
						{
							false &&
							<div className={CNhiddenMetod} onClick={() => handleHiddenOrg(point.id, !point.isHidden)}>Скрыть точку</div>
						}
					</section>
				</div>



			</div>
		</div>
	)
}
export default OrganizationListCart