import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import { connection } from "src/database/mongodbModel/config.mongodb";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { OrganizationServises } from '../servises/organization.servises'
import { Response } from "express";
import OrganizationDTO, { CityDTO } from "../dto/organization.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
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

	@Get('getcity')
  getCity(@Query() query: OrganizationDTO) {
    const result = this.OrganizationServises.getSityBu(query)
    return result
  }

	@Post('getorgbu')
  getOrganizationBu(@Body() body:OrganizationDTO) {
    const result = this.OrganizationServises.getBuOrganization(body)
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

	@Post('checkorg')
  async checkOrg(@Body() body: OrganizationDTO) {
    const result = await this.OrganizationServises.checkOranizationMetod(body)
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

	@Post('reservetable')
  async Reservetable(@Body() body: OrganizationDTO) {
    const result = await this.OrganizationServises.reservetable(body)
		
    return result
  }
	@Get('reservetablebu')
  async ReservetableBu(
		@Body() body: OrganizationDTO,
		@Query() query: OrganizationDTO
		) {
    const result = await this.OrganizationServises.socialMetodBu(query)
		
    return result
  }

	@Post('organizationTime')
	async OrganizationTime(
		@Body() body: OrganizationDTO,
		@Query() query: OrganizationDTO
	){
		console.log('body time',body);
		const result = await this.OrganizationServises.organizationTime(body)
		
    return result
	}


	@Post('cityadd')
	async CityAdd(
		@Body() body: CityDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.addCity(body)
		
    return result
	}

	@Post('organizationAdd')
	async organizationAdd(
		@Body() body: OrganizationDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.organizationAdd(body)
		
    return result
	}

	@Post('organizationDelite')
	async organizationDel(
		@Body() body: OrganizationDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.organizationDelite(body)
		
    return result
	}

}