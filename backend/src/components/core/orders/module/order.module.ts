import { Module } from "@nestjs/common";
import { orderPaymentModule } from "./orderPayment.module";
import { ordersModule } from "./orders.module";

@Module({
  imports: [
    orderPaymentModule,
		ordersModule
  ]
})
export class OrderModule{}