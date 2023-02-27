import { Body, Controller, Get,Post } from "@nestjs/common";

import { RegisterServises } from "../servises/register.servises";
import { RegisterAdminDTO, RegisterDTO } from "../dto/register.dto";

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

	@Post("registration_admin")
  async registerAdmin(
    @Body() body: RegisterAdminDTO,
  ) {
    return this.registerServises.createOrganizationAdmin(body)
  }

  
}