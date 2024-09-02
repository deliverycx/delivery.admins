import { useContext, useEffect } from "react"
import { OrganizationContext } from "../OrganizationSetting"
import Menu from "../../../common/Menu/MenuFoods";
import OrganizationMenu from "../OrganizationMenu/OrganizationMenu";

const TabsMenu = () => {
	const useCaseContext = useContext(OrganizationContext)
	const { foods, slideId, hiddenProducts } = useCaseContext.data
	const { hideProduct, getHiddenProductsByOrg } = useCaseContext.handlers

	return (

		<>
			{
				<OrganizationMenu slideId={slideId} />
			}
		</>
	)
}
export default TabsMenu