import {useContext, useEffect} from "react"
import { OrganizationContext } from "../OrganizationSetting"
import Menu from "../../../common/Menu/MenuFoods";

const TabsMenu = () =>{
    const useCaseContext = useContext(OrganizationContext)
    const {foods, slideId, hiddenProducts} = useCaseContext.data
    const { hideProduct, getHiddenProductsByOrg } = useCaseContext.handlers

    return(

        <>
            {
                !foods ? <div>Загрузка меню</div> : <Menu
                    // groups={foods.groups}
                    // products={foods.products}
                    organization={slideId}
                    data={{groups: foods.groups, products: foods.products, hiddenProducts}}
                    handlers={{hideProduct}}
                />
            }
        </>
    )
}
export default TabsMenu