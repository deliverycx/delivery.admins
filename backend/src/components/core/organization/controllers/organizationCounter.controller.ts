import { Body, Controller, Post } from "@nestjs/common";
import { OrganizationCountServises } from "../servises/organizationCounter.servises";
import OrganizationCountDTO from "../dto/organizationCounter.dto";

@Controller('counterhinkal')
export class organizationCounterControllers{
  constructor(
    private readonly servises: OrganizationCountServises
  ) { }

	@Post('setcount')
	setCoutn(@Body() body:OrganizationCountDTO){
		return body._id ? this.servises.create(body) : this.servises.edit(body,body._id)
	}

}