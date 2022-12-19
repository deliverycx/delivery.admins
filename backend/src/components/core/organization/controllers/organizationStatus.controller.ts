import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import OrganizationStatusDTO from "../dto/organizationStatus.dto";
import { OrganizationStatusServises } from "../servises/organizationStatus.servises";

//@UseGuards(JwtAuthGuard)
@Controller('organization_status')
export class OrganizationStatusControllers{
  constructor(
    private readonly Servises: OrganizationStatusServises
  ) { }
  
	@Get('getstatus')
  async getStatus(@Query() query: OrganizationStatusDTO){
		return await this.Servises.getOrgStatus(query.organization)
	}

	@Post('update')
  async updateStatus(@Body() body: OrganizationStatusDTO){
		return await this.Servises.updateStatus(body)
	}


}