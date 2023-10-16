import {useContext, useEffect} from "react"
import { OrganizationContext } from "../OrganizationSetting"
import {requestOrganizationFoods} from "../../../../../servises/repository/Axios/Request/Request.OrganizationFoods";

const TabsMenu = () =>{
    const useCaseContext = useContext(OrganizationContext)
    const {foods} = useCaseContext.data

    return(
        <>
          Menu
        </>
    )
}
export default TabsMenu