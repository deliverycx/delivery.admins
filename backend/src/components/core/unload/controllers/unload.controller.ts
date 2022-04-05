import { Body, Controller, Get, Post, Render, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller()
export class UnloadControllers{
  
  
  @Post('name')
  name(@Body() body: string) {
    console.log(body)
    return 'name'
  }  

}