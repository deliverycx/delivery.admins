import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";
import { DownloadImage } from "src/application/lib/download";
import { editFileName, imageFileFilter } from "src/application/lib/file-upload.utils";
import { MainBannerDTO } from "../dto/mainBanner.dto";
import { mainBannerServises } from "../servises/mainBanner.servises";

@Controller('mainbanner')
export class MainBannerControllers{
  constructor(
    private readonly BannerServises: mainBannerServises
  ) { }


	@Get('all')
	getAll(@Query() query: MainBannerDTO){
		return this.BannerServises.getAll(query)
	}
	@Get('buorg')
	geBuOrg(@Query() query: MainBannerDTO){
		return this.BannerServises.getOne(query)
	}
	@Get('bu')
	geBu(@Query() query: MainBannerDTO){
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
	async addBanner(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() body:MainBannerDTO,
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
	async editBanner(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() body:MainBannerDTO,
		@Res() response,
		@Query() query: MainBannerDTO
		){
			this.BannerServises.edit(body,query.id,files)
			response.status(200).json({error:false})
		
	}

	@Post('delet')
	async bannerDelete(
		@Query() query: MainBannerDTO,
		@Res() response
	){
		this.BannerServises.delete(query.id)
		response.status(200).json({error:false})
	}

}