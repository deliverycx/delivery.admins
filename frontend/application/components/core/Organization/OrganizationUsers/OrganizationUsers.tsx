import { TadapterCaseCallback, adapterComponentUseCase } from "adapters/adapterComponents"
import OrganizationUsersAdd from "./OrganizationUsersAdd"
import { useCaseAuthOrgUser } from "domains/useCase/auth/useCase.Auth"
import organization from "pages/organization"
import { IOrganization } from "@type"
import { FC } from "react"
import React from "react"

type IProps = {
	organization:IOrganization
}
export const OrganizationUsersContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const OrganizationUsers:FC<IProps> = ({organization}) =>{
	const useCase = adapterComponentUseCase(useCaseAuthOrgUser,organization.id)
	const {info} = useCase.data
	const {handlerSwitchPayment} = useCase.handlers

	return(
		<section className="content">
      <div className="row">
        <div className="col-md-12">
				<OrganizationUsersContext.Provider value={useCase}> 


					<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Пользователи точки</h3>
            </div>
						<div className="card-footer">
							<OrganizationUsersAdd  />
						</div>
            <div className="card-body">
								
									
								
            </div>

          </div>

					

					
					</OrganizationUsersContext.Provider>
        </div>
        
      </div>
      
    </section>
	)

}
export default OrganizationUsers