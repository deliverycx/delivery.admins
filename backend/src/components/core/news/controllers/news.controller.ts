import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";
import { DownloadImage } from "src/application/lib/download";
import { editFileName, imageFileFilter } from "src/application/lib/file-upload.utils";
import { NewsBannerDTO } from "../dto/news.dto";
import { NewsServises } from "../servises/news.servises";

@Controller('news')
export class NewsControllers{
  constructor(
    private readonly BannerServises: NewsServises
  ) { }


	@Get('all')
	getAll(@Query() query: NewsBannerDTO){
		return this.BannerServises.getAll(query)
	}
	@Get('buorg')
	geBuOrg(@Query() query: NewsBannerDTO){
		return this.BannerServises.getOne(query)
	}
	@Get('bu')
	geBu(@Query() query: NewsBannerDTO){
		return this.BannerServises.getOneBuId(query.id)
	}

	@Post('add')
	@UseInterceptors(
		FilesInterceptor('files', 20, {
			storage: diskStorage({
				destination: './public/static',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter
		}),
	)
	async addnews(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() body:NewsBannerDTO,
		@Res() response,
		){
			this.BannerServises.create(body,files)
			response.status(200).json({error:false})
		
	}
	@Post('edit')
	@UseInterceptors(
		FilesInterceptor('files', 20, {
			storage: diskStorage({
				destination: './public/static',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter
		}),
	)
	async editnews(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() body:NewsBannerDTO,
		@Res() response,
		@Query() query: NewsBannerDTO
		){
			this.BannerServises.edit(body,query.id,files)
			response.status(200).json({error:false})
		
	}

	@Post('delet')
	async bannerDelete(
		@Query() query: NewsBannerDTO,
		@Res() response
	){
		this.BannerServises.delete(query.id)
		response.status(200).json({error:false})
	}

}