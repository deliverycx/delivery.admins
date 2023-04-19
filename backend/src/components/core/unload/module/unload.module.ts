import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { CategoryClass } from "src/database/mongodbModel/delivery/category.model";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import { ProductClass } from "src/database/mongodbModel/delivery/product.model";
import { UnloadControllers } from "../controllers/unload.controller";
import { IikoRequesterServises } from "../servises/iiko.servises";
import { UnloadServises } from "../servises/unload.servises";

@Module({
  imports: [
    TypegooseModule.forFeature([OrganizationClass,CityClass,CategoryClass,ProductClass,OrganizationStatusClass], DELIVERY_DB)
  ],
  controllers: [UnloadControllers], 
  providers:[IikoRequesterServises,UnloadServises]
})
export class UnloadModule {}