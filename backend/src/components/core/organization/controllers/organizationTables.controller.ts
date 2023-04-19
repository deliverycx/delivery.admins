import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import { connection } from "src/database/mongodbModel/config.mongodb";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { OrganizationSettingServises } from '../servises/organizationSetting.servises'
import { Response } from "express";
import OrganizationDTO from "../dto/organization.dto";
import OrganizationSettingDTO from "../dto/organizationSetting.dto";
import { OrganizationTableServises } from "../servises/organizationTables.servises";
import { organizationTablesDTO } from "../dto/organizationTables.dto";

//@UseGuards(JwtAuthGuard)
@Controller('organizationTables')
export class OrganizationTablesControllers{
  constructor(
    private readonly organizationTableServises: OrganizationTableServises
  ) { }
  
  @Get('IIkkoTable')
  async IikkoTable(
		@Query() query: organizationTablesDTO
	) {
		const result = await this.organizationTableServises.getIIkkoTable(query)
    return result
  }

	@Post('addtable')
	async addTable(@Body() body: organizationTablesDTO){
		const result = await this.organizationTableServises.addTables(body)
    return result
	}

	@Get('buallorg')
	getAll(@Query() query: organizationTablesDTO){
		return this.organizationTableServises.getBuAll(query)
	}

	@Post('delet')
	delet(@Query() query: organizationTablesDTO){
		return this.organizationTableServises.delete(query.id)
	}


}