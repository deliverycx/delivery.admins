import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from '../Fabric/FabricApi';

@RequestFabric({
    request:'organizationProduct',
    factory:[{
        name:'CRUDFabric',
        fabric:CRUDFabric
    }]
})

class RequestOrganizationFoods extends ApiSuper {
    CRUDFabric!:CRUDFabric

    getAllFoods(data:{organizationId:string}) {
        return this.api({
            method: 'post',
            url: 'organizationProduct/getfoods',
            data
        })
    }

    hideProduct(data: any) {
        return this.api({
            method: 'post',
            url: 'organizationProduct/hide',
            data
        })
    }

    getHiddenProductsByOrg(data: any) {
        return this.api({
            method: 'post',
            url: 'organizationProduct/hiddenProducts',
            data
        })
    }

}

export const requestOrganizationFoods =  new RequestOrganizationFoods()