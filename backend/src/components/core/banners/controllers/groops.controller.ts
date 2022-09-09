import { Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { FormDataRequest } from "nestjs-form-data";
import { editFileName, imageFileFilter } from "src/application/lib/file-upload.utils";
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
		console.log(body);
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

	@Post('addbanner')
	addBanner(@Body() body:GroopsDto){	
		console.log(body);
		return this.groopsServises.addGroopsBanner(body)
	}


}