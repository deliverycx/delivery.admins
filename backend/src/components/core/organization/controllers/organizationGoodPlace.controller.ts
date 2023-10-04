import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import OrganizationGoodPlaceDTO from "../dto/organizationGoodPlace.dto";
import {OrganizationGoodPlaceServises} from "../servises/organizationGoodPlace.services";

@Controller('organization_goodplace')
export class OrganizationGoodPlaceControllers {
    constructor(
        private readonly services: OrganizationGoodPlaceServises
    ) { }

    @Get('all')
    getAll(@Query() query: OrganizationGoodPlaceDTO){
        return this.services.getAll(query)
    }

    @Get('bu')
    geBu(@Query() query: OrganizationGoodPlaceDTO){
        return this.services.getOneBuId(query.id)
    }

    @Get('buorg')
    geBuOrg(@Query() query: OrganizationGoodPlaceDTO){
        return this.services.getOne(query)
    }

    @Post('add')
    add(@Body() body:OrganizationGoodPlaceDTO){
        console.log(body, 'BODY GOODPLACE REQUEST')
        return this.services.create(body)
    }

    @Post('edit')
    edit(
        @Body() body:OrganizationGoodPlaceDTO,
        @Query() query: OrganizationGoodPlaceDTO
    ){
        return this.services.edit(body,query.id)
    }

    @Post('delet')
    async delete(
        @Query() query: OrganizationGoodPlaceDTO,
    ){
        return this.services.delete(query.id)
    }

    @Post('find')
    async findBuOrg(
        @Body() body:OrganizationGoodPlaceDTO
    ){
        return this.services.metodFindBuOrg(body)
    }

    @Post('switchpay')
    async switchPay(
        @Body() body:OrganizationGoodPlaceDTO,
        @Query() query: OrganizationGoodPlaceDTO
    ){
        return this.services.metodSwitchPayMent(query.id,body)
    }
}