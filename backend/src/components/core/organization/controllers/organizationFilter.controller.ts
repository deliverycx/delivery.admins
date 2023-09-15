import { Body, Controller, Get, Post, Query, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { OrganizationFilterServises } from "../servises/organizationFilter.servises";
import OrganizationPaymentDTO from "../dto/organizationPayment.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/application/lib/file-upload.utils";

@Controller('organizationfilter')
export class OrganizationFilterControllers {
	constructor(
		private readonly servises: OrganizationFilterServises
	) { }


	@Post('add')
	@UseInterceptors(
		FilesInterceptor('files', 20, {
			storage: diskStorage({
				destination: './public/static/shop',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter
		}),
	)
	add(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() body: { name: string, images: string },
		@Res() response,
	) {
		console.log(body,files);
		this.servises.create(body, files)
		response.status(200).json({ error: false })
	}


	@Get('all')
	getAll(@Query() query: any){
		console.log(query);
		return this.servises.getAll(query)
	}

	
}