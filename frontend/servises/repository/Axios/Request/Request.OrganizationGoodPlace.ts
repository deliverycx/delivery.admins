import { ApiSuper } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from '../Fabric/FabricApi';

@RequestFabric({
    request:'organization_goodplace',
    factory:[{
        name:'CRUDFabric',
        fabric:CRUDFabric
    }]
})

class RequestOrganizationGoodPlace extends ApiSuper {
    CRUDFabric!:CRUDFabric

    findBuOrg(data:{organization:string}){
        return this.api({
            method: 'post',
            url: `/organization_goodplace/find`,
            data
        })

    }
}

export const requestGoodPlacePayment =  new RequestOrganizationGoodPlace()