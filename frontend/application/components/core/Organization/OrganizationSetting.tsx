import { adapterComponentUseCase, TadapterCaseCallback } from 'adapters/adapterComponents';
import { useOrganization } from 'domains/useCase/organization/useCase.Organization';
import { useOrganizationSetting } from 'domains/useCase/organization/useCase.OrganizationSetting';
import React from 'react';

import OrganizationPayment from './OrganizationPayment/OrganizationPayment';
import OrganizationContlols from './OrganizationSetting/OrganizationContlols';
import OrganizationSettingFrom from './OrganizationSetting/OrganizationInfo';
import OrganizationWorkTime from './OrganizationSetting/OrganizationWorkTime';
import OrganizationTables from './OrganizationTables/OrganizationTables';
import OrgTabPanel from './Tabs/OrgTabPanel';


export const OrganizationContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const OrganizationSetting = () =>{
	const useCase = adapterComponentUseCase(useOrganizationSetting)
	const {organization,social,slideId} = useCase.data
	const {setInput,onSubmit,handleReserveTable,getOrgBu,deliteOrganization} = useCase.handlers

	const useCaseOrg = adapterComponentUseCase(useOrganization,true);

	return(
		<section className="content">
			
			<div className='card'>
                
                {
									organization &&
									<OrganizationContlols point={organization} handels={useCaseOrg.handlers} />
								}
								
              </div>
      <div className="row">
        <div className="col-md-12">
          
				<OrganizationContext.Provider value={useCase}>
				{
					organization && <OrgTabPanel />
				}
			</OrganizationContext.Provider>			
							

					<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Таргет ссылка</h3>
            </div>
            <div className="card-body">
							<span>https://тест.хинкалыч.рф/?organuzation={slideId}</span>
              
            </div>

          </div>


					<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Заказать столик</h3>
            </div>
            <div className="card-body">
							
							
							<input
								id="tablefalse"
	              type="radio"
	              value="false"
	              checked={organization && organization.reservetable == false}
	              onChange={handleReserveTable}
	            />
							<label htmlFor="tablefalse">Скрыть</label>
							<br />
							
							<input
								id="tabletrue"
	              type="radio"
	              value="true"
	              checked={organization && organization.reservetable == true}
	              onChange={handleReserveTable}
	            />
              <label htmlFor="tabletrue">Показать</label>

            </div>

          </div>

					

					
					<button onClick={()=> deliteOrganization(organization._id)}>удалить точку</button>
        </div>
        
      </div>
			
			
      
    </section>

	)
}
export default OrganizationSetting