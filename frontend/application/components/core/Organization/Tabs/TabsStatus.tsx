import { useContext } from "react"
import { OrganizationContext } from "../OrganizationSetting"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganizationStatus } from "domains/useCase/organization/useCase.OrganizationStatus";
import OrganizationDeliveryMetods from "../OrganizationStatus/OrganizationDeliveryMetods";
import OrganizationStatuses from "../OrganizationStatus/OrganizationStatuses";
import OrganizationPaymentMetods from "../OrganizationStatus/OrganizationPaymentMetods";

const TabsStatus = () =>{
	const useCaseContext = useContext(OrganizationContext)
	const {organization} = useCaseContext.data

	const  useCase = adapterComponentUseCase(useOrganizationStatus,organization.id)
	const {organizationStatus} = useCase.data
	const {swtchStatus} = useCase.handlers



	return(
		<>
		{
			organizationStatus &&
			<>
				<OrganizationStatuses organizationStatus={organizationStatus} swtchStatus={swtchStatus} />
				<OrganizationDeliveryMetods organizationStatus={organizationStatus} swtchStatus={swtchStatus} />
				<OrganizationPaymentMetods organizationStatus={organizationStatus} swtchStatus={swtchStatus} />
			</>
		}
		
		</>
	)
}
export default TabsStatus