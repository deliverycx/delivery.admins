import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
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
  getOrganization() {
    const result = this.OrganizationServises.getAllOrganization()
    return result
  }
	@Get('defaultsetting')
  defaultSetting() {
    const result = this.OrganizationServises.getAllOrganization()
    return result
  }
  @Post('puckup')
  swichPuckup(@Body() body:OrganizationDTO) {
    const result = this.OrganizationServises.switchDelivMetod(body)
    return result
  }
  @Post('hidden')
  async hidenOrg(@Body() body: OrganizationDTO) {
    console.log('body',body);
    const result = await this.OrganizationServises.hiddenOranizationMetod(body)
		console.log('res',result);
    return result
  }
	@Post('cityhidden')
  async CityHidden(@Body() body: OrganizationDTO) {
    const result = await this.OrganizationServises.hiddenCityMetod(body)
		
    return result
  }

	@Post('social')
  async Social(@Body() body: OrganizationDTO) {
    const result = await this.OrganizationServises.socialMetod(body)
		
    return result
  }
	@Get('socialbu')
  async SocialBu(
		@Body() body: OrganizationDTO,
		@Query() query: OrganizationDTO
		) {
    const result = await this.OrganizationServises.socialMetodBu(query)
		
    return result
  }


}