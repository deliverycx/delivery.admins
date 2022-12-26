import { IPoint, ListOrganization } from "@type"
import { CART_CHOICE } from "application/contstans/cart.const";
import { FC } from 'react';
import cn from 'classnames';

type IProps = {
	point:IPoint
	handels:any
}

const OrganizationContlols:FC<IProps> = ({point,handels}) =>{
	const {handleHiddenOrg,deliteOrganization} = handels
	
	const CNhiddenMetod = cn('col-2 btn btn-block', { 'btn-success': point.isHidden });									
	return (
		<div className='card-body'>
                        <div className='card-footer'>
                          <a className='card-title title_org' href={`/organization/${point.id}`}>
														{point.address.street}
														
													</a>
                          <div className="organization_control organization_control-box" >
														<section>
															<div className={CNhiddenMetod} onClick={()=> handleHiddenOrg(point.id,!point.isHidden)}>Скрыть точку</div>
															<div className="col-2 btn btn-primary" onClick={()=> deliteOrganization(point.id)}>Обновить точку</div>
														</section>
														
														<div className="col-2 btn btn-danger" onClick={()=> deliteOrganization(point.id)}>Удалить точку</div>
													</div>
                          
																			
                        </div>
                      </div>
	)
}
export default OrganizationContlols