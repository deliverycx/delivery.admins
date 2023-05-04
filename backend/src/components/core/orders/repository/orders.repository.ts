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

	 


}