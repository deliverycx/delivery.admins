import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ADMIN_DB } from "src/database/mongodbModel/config.mongodb";
import { OrderClass } from "src/database/mongodbModel/admin/order.model";
import { ordersControllers } from "../controllers/orders.controller";
import { ordersRepository } from "../repository/orders.repository";
import { ordersServises } from "../servises/orders.servise";

@Module({
  imports: [
    TypegooseModule.forFeature([OrderClass], ADMIN_DB)
  ],
  controllers: [ordersControllers], 
  providers:[ordersServises,ordersRepository]
})
export class ordersModule{}