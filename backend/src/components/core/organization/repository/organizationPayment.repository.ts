import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { PaymentinfosClass } from "src/database/mongodbModel/delivery/paymentinfos.model";
import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class OrganizationPaymentRepository extends BaseRepository<PaymentinfosClass>{
  constructor(
    @InjectModel(PaymentinfosClass) private readonly organizationpaymentModel: ReturnModelType<typeof PaymentinfosClass>,
  ) { 
		super(organizationpaymentModel)
	}

	async findBuOrg(bu:{organization:string}){
		console.log(bu);
		return await this.organizationpaymentModel.findOne(bu).select('-__v')
	}
	async stwitchPayMent(id:string,body:{isActive:boolean}){
		await this.organizationpaymentModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          isActive: body.isActive
        }
      },
      { new: true }
    ) 
	}

}