import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DashbordDTO } from "../dto/dashbord.dto";
import { DashbordServises } from "../servises/dashbord.servises";

@Controller('dashbord')
export class DashbordControllers{
	constructor(
    private readonly dashbordServises: DashbordServises
  ) { }

	@Get('bu')
	buObjID(@Query() query: DashbordDTO){
		return this.dashbordServises.getOne({})
	}

	@Post('getVipGuest')
	setVipGuest(@Body() body: DashbordDTO){
		return this.dashbordServises.setVipGuest(body)
	}
}