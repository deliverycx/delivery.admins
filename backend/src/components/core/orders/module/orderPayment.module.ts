import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { BotAxios } from "src/components/common/bot/bot.axios";
import { PaymentModel } from "src/database/mongodbModel/admin/payment.model";
import { ADMIN_DB } from "src/database/mongodbModel/config.mongodb";
import { orderPaymentControllers } from "../controllers/orderPayment.controller";
import { orderPaymentRepository } from "../repository/orderPayment.repository";
import { orderPaymentServises } from "../servises/orderPayment.servise";
import { ordersRepository } from "../repository/orders.repository";
import { OrderClass } from "src/database/mongodbModel/admin/order.model";

@Module({
  imports: [
    TypegooseModule.forFeature([PaymentModel], ADMIN_DB),
		TypegooseModule.forFeature([OrderClass], ADMIN_DB)
  ],
  controllers: [orderPaymentControllers], 
  providers:[orderPaymentServises,orderPaymentRepository,BotAxios,ordersRepository]
})
export class orderPaymentModule{}