import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GroopsDto } from "../dto/groops.dto";
import { DisplayBannerServises } from "../servises/displayBanner.servises";

@Controller('displaybanner')
export class DisplayBannerControllers{
  constructor(
    private readonly groopsServises: DisplayBannerServises
  ) { }



	@Get('all')
	getAll(@Query() query: GroopsDto){
		return this.groopsServises.getAll(query,'groopbanner')
	}
	@Get('bu')
	geBu(@Query() query: GroopsDto){
		return this.groopsServises.getOneBuId(query.id)
	}

	@Post('add')
	add(@Body() body:GroopsDto){	
		return this.groopsServises.create(body)
	}
	@Post('edit')
	edit(
		@Body() body:GroopsDto,
		@Query() query: GroopsDto
		){	
		return this.groopsServises.edit(body,query.id)
	}

	@Post('delet')
	async delete(
		@Query() query: GroopsDto,
	){
		return this.groopsServises.delete(query.id)
	}
}