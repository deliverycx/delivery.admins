import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { UsersRepository } from "src/components/common/auth/repository/users.repository";
import { LoginController } from "../controllers/login.controller";
import { LoginServises } from "../servises/login.servises";
import { JwtModule } from '@nestjs/jwt';
import { ADMIN_DB, DELIVERY_DB } from "src/database/mongodbModel/config.mongodb";
import { LocalStrategy } from "../strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { RefreshStrategy } from "../strategy/refresh.strategy";
import { JwtStrategy } from "../strategy/jwt.stratagy";



@Module({
  imports: [
    TypegooseModule.forFeature([AdminUsersModel], ADMIN_DB),
    ConfigModule,
    JwtModule.register({
      secret: 'kek',
			signOptions: {
        expiresIn: 30,
      },
    }),
    PassportModule,
  ],
  controllers: [LoginController], 
  providers: [LoginServises,UsersRepository,LocalStrategy,JwtStrategy,RefreshStrategy]
})
export class LoginModule {}