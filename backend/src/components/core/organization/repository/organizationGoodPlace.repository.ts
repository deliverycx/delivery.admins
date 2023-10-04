import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "src/domain/repository/base.repository";
import {OrganizationGoodPlace} from "../../../../database/mongodbModel/delivery/organizationGoodPlace";

@Injectable()
export class OrganizationGoodPlaceRepository extends BaseRepository<OrganizationGoodPlace> {
    constructor(
        @InjectModel(OrganizationGoodPlace) private readonly Model: ReturnModelType<typeof OrganizationGoodPlace>,
    ) {
        super(Model)
    }

    async findBuOrg(bu:{organization:string}){
        return await this.Model.findOne(bu).select('-__v')
    }

}