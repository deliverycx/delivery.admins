import { useContext } from "react"
import { OrganizationContext } from "../OrganizationSetting"
import OrganuzationSocial from "../OrganizationSetting/OrganuzationSocial"
import OrganizationBanner from "../OrganizationSetting/OrganizationBanner"

const TabsDefault = () =>{
	const useCaseContext = useContext(OrganizationContext)
	const {organization} = useCaseContext.data
	const {setInput,onSubmit,handleReserveTable,getOrgBu,deliteOrganization} = useCaseContext.handlers

	return(
		<>
			<OrganuzationSocial organization={organization}/>
			<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Таргет ссылка</h3>
            </div>
            <div className="card-body">
							<span>https://тест.хинкалыч.рф/?organuzation={organization.id}</span>
              
            </div>

          </div>
			<OrganizationBanner id={organization.id} />
		</>
	)
}
export default TabsDefault