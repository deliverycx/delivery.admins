import { Body, Controller, Get, Post, Render, Res, UseGuards } from "@nestjs/common";
import { connection } from "src/database/mongodbModel/config.mongodb";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { IikoRequesterServises } from '../servises/iiko.servises'
import { UnloadServises } from '../servises/unload.servises'
import { Response } from "express";

//@UseGuards(JwtAuthGuard)
@Controller('unload')
export class UnloadControllers{
  constructor(
    private readonly IikoRequesterServises: IikoRequesterServises,
    private readonly UnloadServises: UnloadServises
  ) { }
  
  @Post('pooling')
  async polling(@Res() response: Response) {
    
    connection(process.env.CONNECTION_2)
      .then(async () => {
        console.log("success connect");
        await this.IikoRequesterServises.polling();
        response.status(200).json({result:"ok"})
      }).catch((err) => {
        console.log('ошибка в пулинге',err);
        response.status(500).json({result:"bead"})
      })
    
  }
  @Get('organizations')
  getOrganization(@Res() response: Response) {
    connection(process.env.CONNECTION_2)
      .then(async () => {
        console.log("success connect");
        const result = await this.UnloadServises.getOrganizationsResult()
        
        response.status(200).json({result})
      }).catch((err) => {
        console.log('ошибка в пулинге',err);
        response.status(500).json({result:"bead"})
      })
  }
  

}