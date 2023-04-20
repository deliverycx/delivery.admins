import { Body, Controller, Get,Post } from "@nestjs/common";
import RegisterDTO from "../dto/register.dto";
import { RegisterServises } from "../servises/register.servises";

@Controller("register")
export class RegisterController {
  constructor(
    private readonly registerServises: RegisterServises
  ) { }
  
  @Post("registration")
  async register(
    @Body() body: RegisterDTO,
  ) {
    return this.registerServises.createAdmin(body)
  }

  
}