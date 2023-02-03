import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { UsersRepository } from "src/components/common/auth/repository/users.repository";
import { RegisterController } from "../controllers/register.controller";
import { RegisterServises } from "../servises/register.servises";

@Module({
  imports: [
    TypegooseModule.forFeature([AdminUsersModel], ADMIN_DB),
  ],
  controllers: [RegisterController], 
  providers: [RegisterServises,UsersRepository]
})
export class RegisterModule {}