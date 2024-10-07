import { Body, Controller, Get, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { OrganizationFilterServises } from "../servises/organizationFilter.servises";
import OrganizationPaymentDTO from "../dto/organizationPayment.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/application/lib/file-upload.utils";
import { XmlGuard } from "src/guard/xxe.guard";

@UseGuards(XmlGuard)
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

		this.servises.create(body, files)
		response.status(200).json({ error: false })
	}

	@Post('edit')
	@UseInterceptors(
		FilesInterceptor('files', 20, {
			storage: diskStorage({
				destination: './public/static/shop',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter
		}),
	)
	edit(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() body: { name: string, images: string },
		@Query() query: { id: string },
		@Res() response,
	) {

		this.servises.edit(body, query.id, files)
		response.status(200).json({ error: false })
	}


	@Get('all')
	getAll(@Query() query: any) {
		return this.servises.getAll(query)
	}

	@Post('delet')
	delite(@Query() query: { id: string }) {

		return this.servises.delete(query.id)
	}


}