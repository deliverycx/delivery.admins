import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import { OrganizationStatusServises } from "../servises/organizationStatus.servises";

//@UseGuards(JwtAuthGuard)
@Controller('organization_status')
export class OrganizationStatusControllers{
  constructor(
    private readonly Servises: OrganizationStatusServises
  ) { }
  
  


}