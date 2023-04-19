import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import { connection } from "src/database/mongodbModel/config.mongodb";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { OrganizationSettingServises } from '../servises/organizationSetting.servises'
import { Response } from "express";
import OrganizationDTO from "../dto/organization.dto";
import OrganizationSettingDTO from "../dto/organizationSetting.dto";

//@UseGuards(JwtAuthGuard)
@Controller('organization_setting')
export class OrganizationSettingControllers{
  constructor(
    private readonly organizationSettingServises: OrganizationSettingServises
  ) { }
  
  
  @Post('setting')
  async Reservetable(@Body() body: OrganizationSettingDTO) {
    const result = await this.organizationSettingServises.settingOrganization(body)
    return result
  }


}