import { Controller, Post, Body } from "@nestjs/common"
import {OrganizationFoodsServises} from "../servises/organizationFoods.services";

@Controller('organization_foods')
export class OrganizationFoodsControllers {
    constructor(
        private readonly services: OrganizationFoodsServises
    ) { }

    @Post('all')
    async getOrganizationFoods(
        @Body() organizationId: string
    ) {
        const res = await this.services.getOrganizationFoods(organizationId)
        return res
    }

    // @Get('all')
    // getAll(@Query() query: any){
    //     return this.services.getAll(query)
    // }
    //
    // @Get('bu')
    // geBu(@Query() query: any){
    //     return this.services.getOneBuId(query)
    // }
    //
    // @Get('buorg')
    // geBuOrg(@Query() query: any){
    //     return this.services.getOne(query)
    // }
    //
    // @Post('add')
    // add(@Body() body:OrganizationGoodPlaceDTO){
    //     console.log(body, 'BODY GOODPLACE REQUEST')
    //     return this.services.create(body)
    // }
    //
    // @Post('edit')
    // edit(
    //     @Body() body:OrganizationGoodPlaceDTO,
    //     @Query() query: OrganizationGoodPlaceDTO
    // ){
    //     return this.services.edit(body,query.id)
    // }
    //
    // @Post('delet')
    // async delete(
    //     @Query() query: OrganizationGoodPlaceDTO,
    // ){
    //     return this.services.delete(query.id)
    // }
    //
    // @Post('find')
    // async findBuOrg(
    //     @Body() body:OrganizationGoodPlaceDTO
    // ){
    //     return this.services.metodFindBuOrg(body)
    // }
    //
    // @Post('switchpay')
    // async switchPay(
    //     @Body() body:OrganizationGoodPlaceDTO,
    //     @Query() query: OrganizationGoodPlaceDTO
    // ){
    //     return this.services.metodSwitchPayMent(query.id,body)
    // }
}