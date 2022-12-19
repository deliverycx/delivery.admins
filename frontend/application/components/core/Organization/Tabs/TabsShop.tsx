import { useContext } from "react"
import OrganizationPayment from "../OrganizationPayment/OrganizationPayment"
import { OrganizationContext } from "../OrganizationSetting"
import OrganizationTables from "../OrganizationTables/OrganizationTables"

const TabsShop = () =>{
	const useCaseContext = useContext(OrganizationContext)
	const {organization} = useCaseContext.data
	const {setInput,onSubmit,handleReserveTable,getOrgBu,deliteOrganization} = useCaseContext.handlers
	
	return(
		<>
		<OrganizationTables organization={organization} />
		<OrganizationPayment organization={organization} />
		</>
	)
}
export default TabsShop