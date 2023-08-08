import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { OrganizationCountServises } from "../servises/organizationCounter.servises";
import OrganizationCountDTO from "../dto/organizationCounter.dto";

@Controller('counterhinkal')
export class organizationCounterControllers{
  constructor(
    private readonly servises: OrganizationCountServises
  ) { }

	@Post('setcount')
	setCoutn(@Body() body:OrganizationCountDTO){
		return body._id ? this.servises.edit(body,body._id) : this.servises.create(body)
	}

	@Get('getcount')
	getCount(@Query() query: OrganizationCountDTO){
		return this.servises.getOne(query)
	}

}