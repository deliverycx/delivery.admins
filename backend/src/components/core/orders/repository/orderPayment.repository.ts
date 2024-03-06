import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { PaymentModel } from "src/database/mongodbModel/admin/payment.model";
import { BaseRepository } from "src/domain/repository/base.repository";


@Injectable()
export class orderPaymentRepository extends BaseRepository<PaymentModel>{
	constructor(
    @InjectModel(PaymentModel) private readonly Model: ReturnModelType<typeof PaymentModel>,
  ) {
		super(Model)
	 }

	 async getAll(bu: Record<string, any>, populate?: string): Promise<any[]> {
		return await this.Model.find(bu).select('-__v').sort({paymentTime:'desc'})
	 }


	 async setStatusPayment(orderId:string,status:string){
		console.log('запись',orderId,status);
		const result = await this.Model.findOneAndUpdate({
			paymentid:orderId
		},
		{
			$set:{
				paymentStatus:status 
			}
		},{
			new:true
		}
		
		)
		console.log('запись статуса',result);
		return result
	 }


}