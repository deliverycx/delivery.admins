import { IOrganization } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import Modal from 'application/components/common/Modal/Modal';
import { useOrganizationPayment } from 'domains/useCase/organization/useCase.OrganizationPayment';
import { useOrganizationSetting } from 'domains/useCase/organization/useCase.OrganizationSetting';
import { FC } from 'react';
import OrganizationPayMaster from './OrganizationPayMasterForm';
import cn from 'classnames';
import OrganizationRecvisites from './OrganizationRecvisites';

type IProps = {
	organization:IOrganization
}

const OrganizationPayment:FC<IProps> = ({organization}) =>{
	const useCase = adapterComponentUseCase(useOrganizationPayment,organization.id)
	const {oragPayInfo,payInfoModal} = useCase.data
	const {delitePay,setPayInfoModal} = useCase.handlers

	const CNdelivMetod = oragPayInfo && cn('col-2 btn btn-block', {
		'btn-success':oragPayInfo.isActive,
	});

	return(
		<section className="content">
      <div className="row">
        <div className="col-md-12">
          


					<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Оплата картой</h3>
            </div>
						
            <div className="card-body">
							<div className='card-footer'>
										<div className="row">
										<OrganizationPayMaster paymodal={payInfoModal} settermodal={setPayInfoModal}  id={organization.id} />
										{
											oragPayInfo &&
											<OrganizationRecvisites id={organization.id} />
										}
										
									
								</div>
							</div>	
            </div>

          
					<div className="card card-widget widget-user-2">

              <div className="card-footer p-0">
                <ul className="nav flex-column">
									{
										oragPayInfo &&	oragPayInfo.map((payinfo:any,index:number)=>{
											return (
												<li key={payinfo._id} className="nav-item">
			                    <span className="nav-link float-left">
			                      {payinfo.name} 
														- <strong>{payinfo.typemagaz}</strong>
			                    </span>
													
													<button className="float-right nav-link btn badge-danger" onClick={()=> delitePay(payinfo._id)}>Удалить</button>
			                  </li>
											)
										})
									}
                  
                  
                  
                </ul>
              </div>
            </div>

					

					
						</div>
        </div>
        
      </div>
      
    </section>

	)
}
export default OrganizationPayment