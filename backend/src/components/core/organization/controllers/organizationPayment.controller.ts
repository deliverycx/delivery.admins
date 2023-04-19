import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import OrganizationPaymentDTO from "../dto/organizationPayment.dto"
import OrganizationSettingDTO from "../dto/organizationSetting.dto"
import { OrganizationPaymentServises } from "../servises/organizationPayment.servises"
import { OrganizationSettingServises } from "../servises/organizationSetting.servises"

@Controller('organization_payment')
export class OrganizationPaymentControllers{
  constructor(
    private readonly servises: OrganizationPaymentServises
  ) { }
  
  
  @Get('all')
	getAll(@Query() query: OrganizationPaymentDTO){
		return this.servises.getAll(query)
	}
	@Get('bu')
	geBu(@Query() query: OrganizationPaymentDTO){
		return this.servises.getOneBuId(query.id)
	}
	@Get('buorg')
	geBuOrg(@Query() query: OrganizationPaymentDTO){
		console.log(query);
		return this.servises.getOne(query)
	}

	@Post('add')
	add(@Body() body:OrganizationPaymentDTO){	
		
		return this.servises.create(body)
	}
	@Post('edit')
	edit(
		@Body() body:OrganizationPaymentDTO,
		@Query() query: OrganizationPaymentDTO
		){	
		return this.servises.edit(body,query.id)
	}

	@Post('delet')
	async delete(
		@Query() query: OrganizationPaymentDTO,
	){
		return this.servises.delete(query.id)
	}

	@Post('find')
	async findBuOrg(
		@Body() body:OrganizationPaymentDTO
	){
		return this.servises.metodFindBuOrg(body)
	}

	@Post('switchpay')
	async switchPay(
		@Body() body:OrganizationPaymentDTO,
		@Query() query: OrganizationPaymentDTO
	){
		return this.servises.metodSwitchPayMent(query.id,body)
	}
}