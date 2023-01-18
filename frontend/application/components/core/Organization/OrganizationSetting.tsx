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



	return(
		<section className="content">
			
			<div className='card'>
                
                {
									organization &&
									<OrganizationContlols point={organization} handels={useCase.handlers} />
								}
								
              </div>
      <div className="row">
        <div className="col-md-12">
          
				<OrganizationContext.Provider value={useCase}>
				{
					organization && <OrgTabPanel />
				}
			</OrganizationContext.Provider>			
							
        </div>
        
      </div>
			
			
      
    </section>

	)
}
export default OrganizationSetting