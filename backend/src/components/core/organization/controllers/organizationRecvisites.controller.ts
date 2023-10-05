import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import OrganizationRecvisitesDTO from "../dto/organizationRecvisites.dto"
import { OrganizationRecvisitesServises } from "../servises/organizationRecvisites.servises"

@Controller('organization_recvisites')
export class OrganizationRecvisitesControllers{
  constructor(
    private readonly servises: OrganizationRecvisitesServises
  ) { }
  
  
  @Get('all')
	getAll(@Query() query: any){
		return this.servises.getAll(query.organizationId)
	}

	@Get('bu')
	geBu(@Query() query: OrganizationRecvisitesDTO){
		return this.servises.getOneBuId(query.id)
	}

	@Get('buorg')
	geBuOrg(@Query() query: any){
		return this.servises.getOne(query.organizationId)
	}

	@Post('add')
	add(@Body() body:OrganizationRecvisitesDTO){
		console.log('ADD', body)
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