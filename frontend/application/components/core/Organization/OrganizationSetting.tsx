import { adapterComponentUseCase, TadapterCaseCallback } from 'adapters/adapterComponents';
import { useOrganizationSetting } from 'domains/useCase/organization/useCase.OrganizationSetting';
import React from 'react';

import OrganizationContlols from './OrganizationSetting/OrganizationContlols';
import OrgTabPanel from './Tabs/OrgTabPanel';
import OrganizationMOKOrder from './OrganizationAnalitiks/OrganizationMOKOrder';


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
			<div className="card">
				<div className="card-body">
					{
						organization &&
						<OrganizationMOKOrder organization={organization} />
					}
					
				</div>
				
			</div>
			
      
    </section>

	)
}
export default OrganizationSetting