import { Inject, Injectable } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import {OrganizationGoodPlaceRepository} from "../repository/organizationGoodPlace.repository";


@Injectable()
export class OrganizationGoodPlaceServises extends BaseServises {
    constructor(
        @Inject(OrganizationGoodPlaceRepository)
        private readonly Repository
    ) {
        super(Repository);
    }

    metodFindBuOrg(body:any){
        return this.Repository.findBuOrg(body)
    }

    metodSwitchPayMent(id:string,body:any){
        this.Repository.stwitchPayMent(id,body)
    }

}