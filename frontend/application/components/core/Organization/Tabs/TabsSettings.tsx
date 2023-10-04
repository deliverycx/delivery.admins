import { useContext } from "react"
import { OrganizationContext } from "../OrganizationSetting"
import OrganizationInfo from "../OrganizationSetting/OrganizationInfo"
import OrganizationWorkTime from "../OrganizationSetting/OrganizationWorkTime"
import OrganizationReverseTable from "../OrganizationSetting/OrganizationReverseTable"
import OrganizationRedirect from "../OrganizationSetting/OrganizationRedirect"
import OrganizationGallery from "../OrganizationSetting/OrganizationGallery"
import OrganizationFilters from "../OrganizationSetting/OrganizationFilters"
import OrganizationGoodPlace from "../OrganizationSetting/OrganizationGoodPlace";

const TabsSettings = () =>{
	const useCaseContext = useContext(OrganizationContext)
	const { organization } = useCaseContext.data
	const { getOrgBu } = useCaseContext.handlers


	return(
		<>
			<OrganizationWorkTime organization={organization} refresh={getOrgBu} />
			<OrganizationInfo organization={organization} />
			<OrganizationReverseTable organization={organization} refresh={getOrgBu} />
			<OrganizationRedirect organization={organization} refresh={getOrgBu} />
			<OrganizationGoodPlace organization={organization} refresh={getOrgBu} />
			<OrganizationGallery organization={organization} />
			<OrganizationFilters organization={organization} refresh={getOrgBu} />
		</>
	)
}
export default TabsSettings