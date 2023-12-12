import { Controller, Post, Body } from "@nestjs/common"
import {OrganizationProductServices} from "../servises/organizationProduct.services";
import OrganizationHiddenProductDto from "../dto/organizationHiddenProduct.dto";

@Controller('organizationProduct')
export class OrganizationProductController {
    constructor(
        private readonly services: OrganizationProductServices
    ) { }

		@Post('getfoods')
	  async getOrganizationFoods(@Body() id: {organizationId: string}) {
		  const data = await this.services.getOrganizationFoods(id)
		  return data
	  }

    @Post('hide')
    async hiddenProduct(@Body() body: OrganizationHiddenProductDto) {
      return await this.services.hiddenProductMethod(body)
    }

    @Post('hiddenProducts')
    async getHiddenProducts(@Body() body: OrganizationHiddenProductDto) {
		
      const result = await this.services.getHiddenProductsByOrgMethod(body)
			return result
    }
}