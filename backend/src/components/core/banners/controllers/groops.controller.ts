import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GroopsDto } from "../dto/groops.dto";
import { GroopsServises } from "../servises/groops.servises";

@Controller('groops')
export class GroopsControllers{
  constructor(
    private readonly groopsServises: GroopsServises
  ) { }



	@Get('all')
	getAll(@Query() query: GroopsDto){
		return this.groopsServises.getAll(query)
	}
	@Get('bu')
	geBu(@Query() query: GroopsDto){
		return this.groopsServises.getOneBuId(query.id)
	}

	@Post('add')
	addGroop(@Body() body:GroopsDto){	
		return this.groopsServises.create(body)
	}
	@Post('edit')
	editGroop(
		@Body() body:GroopsDto,
		@Query() query: GroopsDto
		){	
		return this.groopsServises.edit(body,query.id)
	}

	@Post('delet')
	async deleteGroop(
		@Query() query: GroopsDto,
	){
		return this.groopsServises.delete(query.id)
	}
}