import { Body, Controller, Get, Post, Render, Res, UseGuards } from "@nestjs/common";
import { connection } from "src/database/mongodbModel/config.mongodb";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { OrganizationServises } from '../servises/organization.servises'
import { Response } from "express";
import OrganizationDTO from "../dto/organization.dto";

//@UseGuards(JwtAuthGuard)
@Controller('organization')
export class OrganizationControllers{
  constructor(
    private readonly OrganizationServises: OrganizationServises
  ) { }
  
  
  @Get('getAll')
  getOrganization(@Body() body:OrganizationDTO) {
    const result = this.OrganizationServises.getAllOrganization()
    return result
  }
  @Post('puckup')
  swichPuckup(@Body() body:OrganizationDTO) {
    const result = this.OrganizationServises.switchDelivMetod(body)
    console.log(result)
    return result
  }

}