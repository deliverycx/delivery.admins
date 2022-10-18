import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { PaymentModel } from "src/database/mongodbModel/admin/payment.model";
import { ADMIN_DB } from "src/database/mongodbModel/config.mongodb";
import { orderPaymentControllers } from "../controllers/orderPayment.controller";
import { orderPaymentRepository } from "../repository/orderPayment.repository";
import { orderPaymentServises } from "../servises/orderPayment.servise";

@Module({
  imports: [
    TypegooseModule.forFeature([PaymentModel], ADMIN_DB)
  ],
  controllers: [orderPaymentControllers], 
  providers:[orderPaymentServises,orderPaymentRepository]
})
export class orderPaymentModule{}