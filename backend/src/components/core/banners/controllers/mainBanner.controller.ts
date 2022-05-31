import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { MainBannerDTO } from "../dto/mainBanner.dto";
import { mainBannerServises } from "../servises/mainBanner.servises";

@Controller('mainbanner')
export class MainBannerControllers{
  constructor(
    private readonly BannerServises: mainBannerServises
  ) { }


	@Get('all')
	getList(){
		return this.BannerServises.getAll()
	}

	@Post('add')
	addBanner(
		@Body() body:MainBannerDTO
		){
		return this.BannerServises.create<MainBannerDTO>(body)
	}

}