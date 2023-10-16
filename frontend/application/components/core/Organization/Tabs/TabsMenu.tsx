import {useContext, useEffect} from "react"
import { OrganizationContext } from "../OrganizationSetting"
import Menu from "../../../common/Menu/MenuFoods";

const TabsMenu = () =>{
    const useCaseContext = useContext(OrganizationContext)
    const {foods} = useCaseContext.data

    return(

        <>
            {
                !foods ? <div>Загрузка меню</div> : <Menu groups={foods.groups} products={foods.products} />
            }
        </>
    )
}
export default TabsMenu