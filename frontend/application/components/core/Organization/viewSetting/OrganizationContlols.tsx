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
														<small>  - {point.delivMetod === CART_CHOICE.NOWORK && 'Онлайн заказ не доступен'}</small>
													</a>
                          
                          
													<div className="organization_control" >
															<div className={CNhiddenMetod} onClick={() => handleHiddenOrg(point.id, !point.isHidden)}>
															Скрыть точку
                              </div>
                                <div className={CNdelivMetod}
                                     onClick={() => handlePuckUp(
                                       point.id,
                                       point.delivMetod === CART_CHOICE.PICKUP ? null : CART_CHOICE.PICKUP)}
                                >Только Самовывоз
                                </div>
                                <div className={CNdelivMetodNODELIV}
                                     onClick={() => handlePuckUp(
                                       point.id,
                                       point.delivMetod === CART_CHOICE.NODELIVERY ? null : CART_CHOICE.NODELIVERY)}
                                >Только просмотр
                                </div>
																<div className={CNdelivMetodOPEN}
                                     onClick={() => handlePuckUp(
                                       point.id,
                                       point.delivMetod === CART_CHOICE.OPEN ? null : CART_CHOICE.OPEN)}
                                >Открытие
                                </div>
													</div>						
                        </div>
                      </div>
	)
}
export default OrganizationContlols