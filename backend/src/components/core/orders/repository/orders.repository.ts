import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { OrderClass } from "src/database/mongodbModel/admin/order.model";
import { BaseRepository } from "src/domain/repository/base.repository";


@Injectable()
export class ordersRepository extends BaseRepository<OrderClass>{
	constructor(
    @InjectModel(OrderClass) private readonly Model: ReturnModelType<typeof OrderClass>,
  ) {
		super(Model)
	 }

	 
	 async getAllOrder(bu: Record<string, any>, limit: number): Promise<any[]> {
		return await this.Model.find(bu).select('-__v').sort({createdAt:'desc'}).limit(limit).exec()
	 }

	 async getAllOrderErrors(): Promise<any[]> {
		return await this.Model.find({orderError:{$ne:null}}).select('-__v').sort({createdAt:'desc'}).limit(90).exec()
	 }

	 async setStatusPayment(orderid:string,status:string){
		console.log('запись',orderid,status);
		const result = await this.Model.findOneAndUpdate({
			orderId:orderid
		},
		{
			$set: { "payment.paymentStatus": status }
		},{
			new:true
		}
		
		)
		console.log('запись статуса',result);
		return result
	 }

}