import { useContext } from "react"
import { OrganizationContext } from "../OrganizationSetting"
import OrganizationUsers from "../OrganizationUsers/OrganizationUsers"

const TabsUsers = () =>{
	const useCaseContext = useContext(OrganizationContext)
	const {organization} = useCaseContext.data

	return(
		<>
		<OrganizationUsers organization={organization} />
		</>
	)
}
export default TabsUsers