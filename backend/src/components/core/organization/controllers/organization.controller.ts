import { Body, Controller, Get, Post, Query, Render, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { connection } from "src/database/mongodbModel/config.mongodb";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { OrganizationServises } from '../servises/organization.servises'
import { Response } from "express";
import OrganizationDTO, { CityDTO } from "../dto/organization.dto";
import { AuthGuard } from "@nestjs/passport";
import { AnyFilesInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/application/lib/file-upload.utils";
import { MainBannerDTO } from "../../banners/dto/mainBanner.dto";
import {Public} from "../../../../guard/public-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('organization')
export class OrganizationControllers{
	constructor(
		private readonly OrganizationServises: OrganizationServises
	) { }


	@Get('getAll')
	getOrganization() {
		const result = this.OrganizationServises.getAllOrganization()
		return result
	}


	@Get('getcity')
	getCity(@Query() query: OrganizationDTO) {
		const result = this.OrganizationServises.getSityBu(query)
		return result
	}

	@Post('getorgbu')
	getOrganizationBu(@Body() body:OrganizationDTO) {
		const result = this.OrganizationServises.getBuOrganization(body)
		return result
	}
	@Get('defaultsetting')
	defaultSetting() {
		const result = this.OrganizationServises.getAllOrganization()
		return result
	}
	@Post('puckup')
	swichPuckup(@Body() body:OrganizationDTO) {
		const result = this.OrganizationServises.switchDelivMetod(body)
		return result
	}
	@Post('hidden')
	async hidenOrg(@Body() body: OrganizationDTO) {
		console.log('body',body);
		const result = await this.OrganizationServises.hiddenOranizationMetod(body)
		console.log('res',result);
		return result
	}
	@Post('cityhidden')
	async CityHidden(@Body() body: OrganizationDTO) {
		const result = await this.OrganizationServises.hiddenCityMetod(body)

		return result
	}

	@Post('checkorg')
	async checkOrg(@Body() body: OrganizationDTO) {
		const result = await this.OrganizationServises.checkOranizationMetod(body)
		return result
	}

	@Post('social')
	async Social(@Body() body: OrganizationDTO) {
		const result = await this.OrganizationServises.socialMetod(body)

		return result
	}

	@Post('like')
	async like(@Body() body: OrganizationDTO) {
		const result = await this.OrganizationServises.socialLikeMethod(body)

		return result
	}

	@Get('socialbu')
	@Public()
	async SocialBu(
		@Body() body: OrganizationDTO,
		@Query() query: OrganizationDTO
	) {
		const result = await this.OrganizationServises.socialMetodBu(query)

		return result
	}

	@Post('reservetable')
	async Reservetable(@Body() body: OrganizationDTO) {
		const result = await this.OrganizationServises.reservetable(body)

		return result
	}
	@Get('reservetablebu')
	async ReservetableBu(
		@Body() body: OrganizationDTO,
		@Query() query: OrganizationDTO
	) {
		const result = await this.OrganizationServises.socialMetodBu(query)

		return result
	}

	@Post('organizationTime')
	async OrganizationTime(
		@Body() body: OrganizationDTO,
		@Query() query: OrganizationDTO
	){
		console.log('body time',body);
		const result = await this.OrganizationServises.organizationTime(body)

		return result
	}


	@Post('cityadd')
	async CityAdd(
		@Body() body: CityDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.addCity(body)

		return result
	}

	@Post('organizationAdd')
	async organizationAdd(
		@Body() body: OrganizationDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.organizationAdd(body)

		return result
	}

	@Post('organizationDelite')
	async organizationDel(
		@Body() body: OrganizationDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.organizationDelite(body)

		return result
	}

	@Post('organizationRedirect')
	async organizationRedirect(
		@Body() body: OrganizationDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.organizationRedirect(body)

		return result
	}

	@Post('organizationRedirectON')
	async organizationRedirectON(
		@Body() body: OrganizationDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.organizationRedirectON(body)

		return result
	}

	@Post('organizationTerminal')
	async organizationTerminal(
		@Body() body: OrganizationDTO,
	){
		console.log('body',body);
		const result = await this.OrganizationServises.organizationTerminal(body.idorganization)

		return result
	}


	@Post('addPhoto')
	@UseInterceptors(
		FilesInterceptor('files', 20, {
			storage: diskStorage({
				destination: './public/static/shop',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter
		}),
	)
	async addPhoto(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() body:{idorganization:string},
		@Res() response,
	){
		console.log('добавить',body,files);
		const result = await this.OrganizationServises.addOrgPhoto(body.idorganization,files)
		response.status(200).json(result)
	}

	@Post('addfilter')
	async addFilters(@Body() body:{filterlist:string[],idorganization:string},){
		const result = await this.OrganizationServises.addFiltersServis(body)
		return result
	}

}