import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import OrganizationPaymentDTO from "../dto/organizationPayment.dto"
import OrganizationRecvisitesDTO from "../dto/organizationRecvisites.dto"
import OrganizationSettingDTO from "../dto/organizationSetting.dto"
import { OrganizationPaymentServises } from "../servises/organizationPayment.servises"
import { OrganizationRecvisitesServises } from "../servises/organizationRecvisites.servises"
import { OrganizationSettingServises } from "../servises/organizationSetting.servises"

@Controller('organization_recvisites')
export class OrganizationRecvisitesControllers{
  constructor(
    private readonly servises: OrganizationRecvisitesServises
  ) { }
  
  
  @Get('all')
	getAll(@Query() query: OrganizationRecvisitesDTO){
		return this.servises.getAll(query)
	}
	@Get('bu')
	geBu(@Query() query: OrganizationRecvisitesDTO){
		return this.servises.getOneBuId(query.id)
	}
	@Get('buorg')
	geBuOrg(@Query() query: OrganizationRecvisitesDTO){
		console.log(query);
		return this.servises.getOne(query)
	}

	@Post('add')
	add(@Body() body:OrganizationRecvisitesDTO){	
		
		return this.servises.create(body)
	}
	@Post('edit')
	edit(
		@Body() body:OrganizationRecvisitesDTO,
		@Query() query: OrganizationRecvisitesDTO
		){	
		return this.servises.edit(body,query.id)
	}

	@Post('delet')
	async delete(
		@Query() query: OrganizationRecvisitesDTO,
	){
		return this.servises.delete(query.id)
	}

	@Post('find')
	async findBuOrg(
		@Body() body:OrganizationRecvisitesDTO
	){
		return this.servises.metodFindBuOrg(body)
	}

	@Post('switchpay')
	async switchPay(
		@Body() body:OrganizationRecvisitesDTO,
		@Query() query: OrganizationRecvisitesDTO
	){
		return this.servises.metodSwitchPayMent(query.id,body)
	}
}