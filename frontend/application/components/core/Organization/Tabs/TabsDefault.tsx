import { useContext } from "react"
import { OrganizationContext } from "../OrganizationSetting"
import OrganuzationSocial from "../OrganizationSetting/OrganuzationSocial"

const TabsDefault = () =>{
	const useCaseContext = useContext(OrganizationContext)
	const {organization} = useCaseContext.data
	const {setInput,onSubmit,handleReserveTable,getOrgBu,deliteOrganization} = useCaseContext.handlers

	return(
		<>
			<OrganuzationSocial organization={organization}/>
		</>
	)
}
export default TabsDefault