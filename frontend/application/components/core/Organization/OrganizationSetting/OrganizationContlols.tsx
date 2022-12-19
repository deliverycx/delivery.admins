import { IPoint, ListOrganization } from "@type"
import { CART_CHOICE } from "application/contstans/cart.const";
import { FC } from 'react';
import cn from 'classnames';

type IProps = {
	point:IPoint
	handels:any
}

const OrganizationContlols:FC<IProps> = ({point,handels}) =>{
	const {handlePuckUp, handleHiddenOrg} = handels
	const CNdelivMetod = cn('col-2 btn btn-block', {
                      'btn-success':
                        (point.delivMetod === CART_CHOICE.PICKUP),
                    });
                    const CNdelivMetodNODELIV = cn('col-2 btn btn-block', {
                      'btn-success':
                        (point.delivMetod === CART_CHOICE.NODELIVERY),
                    });
										const CNdelivMetodOPEN = cn('col-2 btn btn-block', {
                      'btn-success':
                        (point.delivMetod === CART_CHOICE.OPEN),
                    });
	const CNhiddenMetod = cn('col-2 btn btn-block', { 'btn-success': point.isHidden });									
	return (
		<div className='card-body'>
                        <div className='card-footer'>
                          <a className='card-title title_org' href={`/organization/${point.id}`}>
														{point.address.street}
														<small> {point.delivMetod === CART_CHOICE.NOWORK && ' - Онлайн-заказ не доступен'}</small>
													</a>
                          
                          
																			
                        </div>
                      </div>
	)
}
export default OrganizationContlols