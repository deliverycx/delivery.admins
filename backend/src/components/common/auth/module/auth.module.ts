import { Module } from "@nestjs/common";
import { LoginModule } from "./login.module";
import { RegisterModule } from "./register.module";

@Module({
  imports: [
    RegisterModule,
    LoginModule
  ]
})
export class AuthModule{}