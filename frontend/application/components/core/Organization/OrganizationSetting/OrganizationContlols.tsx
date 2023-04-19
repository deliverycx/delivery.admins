import { IPoint, ListOrganization } from "@type"
import { CART_CHOICE } from "application/contstans/cart.const";
import { FC } from 'react';
import cn from 'classnames';
import RequestOrganization from "servises/repository/Axios/Request/Request.Organization";
import { useState } from 'react';

type IProps = {
	point:IPoint
	handels:any
}

const OrganizationContlols:FC<IProps> = ({point,handels}) =>{
	const {handleHiddenOrg,deliteOrganization,getOrgBu} = handels
	const [infocheck,setCheck] = useState<any>(null)

	const checkOrganization = async (idorganization: string) =>{
		try {
			const {data} = await RequestOrganization.checkOrganization({idorganization})
			setCheck(data)
			getOrgBu(point.id)
		} catch (error) {
			
		}
	}

	
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
															<div className="col-2 btn btn-primary" onClick={()=> checkOrganization(point.id)}>Проверить точку</div>
														</section>
														
														<div className="col-2 btn btn-danger" onClick={()=> deliteOrganization(point.id)}>Удалить точку</div>
													</div>
                          
																			
                        </div>
												{
													infocheck && infocheck.map((val:any) =>{
														if(val._id === point.city){
															return <li>город <span className="lead">{val.name}</span>  - <span className="text-success">ошибок нет</span></li>
														}else{
															return <li><span className="text-danger">есть ошибка</span> нажмите повторно `Проверить точку`</li>
														}
													})
												}
                      </div>
	)
}
export default OrganizationContlols