import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import OrganizationStatusDTO from "../dto/organizationStatus.dto";
import { OrganizationStatusServises } from "../servises/organizationStatus.servises";
import { SqlInjectionGuard, XmlGuard } from "src/guard/xxe.guard";

//@UseGuards(JwtAuthGuard)
@UseGuards(SqlInjectionGuard, XmlGuard)
@Controller('organization_status')
export class OrganizationStatusControllers {
	constructor(
		private readonly Servises: OrganizationStatusServises
	) { }

	@Get('getstatus')
	async getStatus(@Query() query: OrganizationStatusDTO) {
		return await this.Servises.getOrgStatus(query.organization)
	}

	@Post('update')
	async updateStatus(@Body() body: OrganizationStatusDTO) {
		return await this.Servises.updateStatus(body)
	}


}