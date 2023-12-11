import { Controller, Post, Body } from "@nestjs/common"
import {OrganizationProductServices} from "../servises/organizationProduct.services";
import OrganizationHiddenProductDto from "../dto/organizationHiddenProduct.dto";

@Controller('organization')
export class OrganizationProductController {
    constructor(
        private readonly services: OrganizationProductServices
    ) { }

    @Post('hide')
    async hiddenProduct(@Body() body: OrganizationHiddenProductDto) {
      return await this.services.hiddenProductMethod(body)
    }

    @Post('get')
    async getHiddenProducts(@Body() body: OrganizationHiddenProductDto) {
      return await this.services.getHiddenProductsByOrgMethod(body)
    }
}