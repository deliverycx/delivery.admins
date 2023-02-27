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
	const {users} = useCase.data
	const {deliteUser} = useCase.handlers

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
								
						<div className="card card-widget widget-user-2">

							<div className="card-footer p-0">
								<ul className="nav flex-column">
									{
										users &&	users.map((value:any,index:number)=>{
											return (
												<li key={value._id} className="nav-item">
													<span className="nav-link float-left">
														{value.name} 
													</span>
													<button className="float-right nav-link btn badge-danger" onClick={()=> deliteUser(value._id)}>Удалить</button>
												</li>
											)
										})
									}
									
									
									
								</ul>
							</div>
							</div>		
								
            </div>

          </div>

					

					
					</OrganizationUsersContext.Provider>
        </div>
        
      </div>
      
    </section>
	)

}
export default OrganizationUsers