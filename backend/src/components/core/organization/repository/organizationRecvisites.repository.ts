import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { PaymentRecvisitesClass } from "src/database/mongodbModel/delivery/paymentRecvisites.model";
import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class OrganizationRecvisitesRepository extends BaseRepository<PaymentRecvisitesClass>{
  constructor(
    @InjectModel(PaymentRecvisitesClass) private readonly Model: ReturnModelType<typeof PaymentRecvisitesClass>,
  ) { 
		super(Model)
	}

	async findBuOrg(bu:{organization:string}){
		return await this.Model.findOne(bu).select('-__v')
	}

}