import { IOrganization } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import Modal from 'application/components/common/Modal/Modal';
import { useOrganizationPayment } from 'domains/useCase/organization/useCase.OrganizationPayment';
import { useOrganizationSetting } from 'domains/useCase/organization/useCase.OrganizationSetting';
import { FC } from 'react';
import OrganizationPayMaster from './OrganizationPayMaster';
import cn from 'classnames';
import OrganizationRecvisites from './OrganizationRecvisites';

type IProps = {
	organization:IOrganization
}

const OrganizationPayment:FC<IProps> = ({organization}) =>{
	const useCase = adapterComponentUseCase(useOrganizationPayment,organization._id)
	const {info} = useCase.data
	const {handlerSwitchPayment} = useCase.handlers

	const CNdelivMetod = info && cn('col btn btn-block', {
		'btn-success':info.isActive,
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
								{
									info &&
									<button className={CNdelivMetod} onClick={() => handlerSwitchPayment(!info.isActive)}>
										{info.isActive ? 'Выключить оплату' : 'Включить оплату'}
									</button>
								}
								
								<div className='card-footer'>
									<OrganizationPayMaster id={organization._id} />
									{
										info &&
										<OrganizationRecvisites id={organization._id} />
									}
									
								</div>
            </div>

          </div>

					

					

        </div>
        
      </div>
      
    </section>

	)
}
export default OrganizationPayment