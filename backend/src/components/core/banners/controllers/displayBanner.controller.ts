import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DisplayBannerDto } from "../dto/displayBanner.dto";
import { GroopsDto } from "../dto/groops.dto";
import { DisplayBannerServises } from "../servises/displayBanner.servises";

@Controller('display')
export class DisplayBannerControllers{
  constructor(
    private readonly displayServises: DisplayBannerServises
  ) { }



	@Get('all')
	getAll(@Query() query: DisplayBannerDto){
		return this.displayServises.getAll(query)
	}
	@Get('bu')
	geBu(@Query() query: DisplayBannerDto){
		return this.displayServises.getOneBuId(query.id)
	}

	@Post('add')
	add(@Body() body:DisplayBannerDto){	
		return this.displayServises.create(body)
	}
	@Post('edit')
	edit(
		@Body() body:DisplayBannerDto,
		@Query() query: DisplayBannerDto
		){	
		return this.displayServises.edit(body,query.id)
	}

	@Post('delet')
	async delete(
		@Query() query: DisplayBannerDto,
	){
		return this.displayServises.delete(query.id)
	}
	@Post('addfield')
	async addBuField(
		@Body() body:DisplayBannerDto,
		@Query() query: DisplayBannerDto,
	){
		return this.displayServises.addBannerGroops(body,query.id)
	}

	@Post('deletfield')
	async deletBuField(
		@Body() body:DisplayBannerDto,
		@Query() query: DisplayBannerDto,
	){
		return this.displayServises.deletBannerGroops(body,query.id)
	}
}