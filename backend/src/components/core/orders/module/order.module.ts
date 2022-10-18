import { Module } from "@nestjs/common";
import { orderPaymentModule } from "./orderPayment.module";

@Module({
  imports: [
    orderPaymentModule
  ]
})
export class OrderModule{}