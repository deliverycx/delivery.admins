import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { UsersRepository } from "src/domain/repository/users.repository";
import { LoginController } from "../controllers/login.controller";
import { LoginServises } from "../servises/login.servises";
import { JwtModule } from '@nestjs/jwt';
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { LocalStrategy } from "../strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtStratagy } from "../strategy/jwt.stratagy";
import { ConfigModule } from "@nestjs/config";



@Module({
  imports: [
    TypegooseModule.forFeature([AdminUsersModel], ADMIN_DB),
    ConfigModule,
    JwtModule.register({
      secret: 'kek',
    }),
    PassportModule,
  ],
  controllers: [LoginController], 
  providers: [LoginServises,UsersRepository,LocalStrategy,JwtStratagy]
})
export class LoginModule {}