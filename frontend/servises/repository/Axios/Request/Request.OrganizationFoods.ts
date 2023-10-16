import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from '../Fabric/FabricApi';

@RequestFabric({
    request:'organization',
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
            url: 'organization/getfoods',
            data
        })
    }
}

export const requestOrganizationFoods =  new RequestOrganizationFoods()