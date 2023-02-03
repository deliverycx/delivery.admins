import { Body, Controller, Get,Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { LocalAuthGuard } from "src/guard/local-auth.guard";
import LoginDTO from "../dto/login.dto";
import { LoginServises } from "../servises/login.servises";


@Controller("autorizate")
export class LoginController {
  constructor(
    private readonly LoginServises: LoginServises
  ) { }
  
  //@UseGuards(LocalAuthGuard)
  @Post("login")
  async autoriz(@Body() body: LoginDTO) {
    const {name} = await this.LoginServises.validateUsers(body.name,body.password)
    return this.LoginServises.login(name)
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('checkauth')
  async checkAuth(){
    return true
  }

  
}