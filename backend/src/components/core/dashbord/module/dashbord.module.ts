import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { DashbordModel } from "src/database/mongodbModel/admin/dashbord.model";
import { ADMIN_DB } from "src/database/mongodbModel/config.mongodb";
import { DashbordControllers } from "../controllers/dashbord.controller";
import { DashbordRepository } from "../repository/dashbord.repository";
import { DashbordServises } from "../servises/dashbord.servises";

@Module({
  imports: [
    TypegooseModule.forFeature([DashbordModel], ADMIN_DB)
  ],
  controllers: [DashbordControllers], 
  providers:[DashbordRepository,DashbordServises]
})
export class DashbordModule{

}