import { Body, CACHE_MANAGER, Controller, Get, Inject, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import { connection } from "src/database/mongodbModel/config.mongodb";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { IikoRequesterServises } from '../servises/iiko.servises'
import { UnloadServises } from '../servises/unload.servises'
import { Response } from "express";
import { RedisClient } from "redis";
import { REDIS } from "src/module/redis.module";
import { IikoOrganizationServises } from "../servises/iikkoOrganizations.servises";


//@UseGuards(JwtAuthGuard)
@Controller('unload')
export class UnloadControllers{
  constructor(
    private readonly IikoRequesterServises: IikoRequesterServises,
    private readonly UnloadServises: UnloadServises,
		private readonly iikoOrganizationServises:IikoOrganizationServises,
		
		@Inject(REDIS) private readonly redis: RedisClient,
  ) { }
  
  @Post('pooling')
  async polling(@Res() response: Response) {
    
    connection(process.env.CONNECTION_2)
      .then(async () => {
        console.log("success connect");
				
				
        //await this.IikoRequesterServises.polling();
        response.status(200).json({result:"ok"})
      }).catch((err) => {
        console.log('ошибка в пулинге',err);
        response.status(500).json({result:"bead"})
      })
    
  }
  @Get('organizations')
  getOrganization(@Res() response: Response) {
    connection(process.env.CONNECTION_2)
      .then(async () => {
        console.log("success connect");
				
        const result = await this.UnloadServises.getOrganizationsResult()
        
        response.status(200).json({result})
      }).catch((err) => {
        console.log('ошибка в пулинге',err);
        response.status(500).json({result:"bead"})
      })
  }
  

	@Get('iikkoOrganizations')	
	async getiikkoOrganizations(){
		return await this.iikoOrganizationServises.iikkoOrgs()
	}

	@Get('iikkoOrganizationInfo')	
	async getiikkoOrganizationInfo(
		@Query() query: {organization:string}
	){
		return await this.iikoOrganizationServises.ikkoOrgInfo(query.organization)
	}

	@Get('poolingOrganization')	
	poolingOrganization(
		@Res() response: Response,
		@Query() query: {organization:string}
	){
		connection(process.env.CONNECTION_2)
      .then(async () => {
        console.log("success connect");
				
        await this.iikoOrganizationServises.poolingOrg(query.organization)
        
        response.status(200).json({})
      }).catch((err) => {
        console.log('ошибка в пулинге',err);
        response.status(500).json({result:"bead"})
      })
	}


	@Get('poolingNomenclature')	
	async poolingNomenclature(
		@Res() response: Response,
		@Query() query: {organization:string}
	){
		connection(process.env.CONNECTION_2)
      .then(async () => {
        console.log("success connect");
				
        const revision = await this.iikoOrganizationServises.poolingMenu(query.organization)
        
        response.status(200).json(revision)
      }).catch((err) => {
        console.log('ошибка в пулинге',err);
        response.status(500).json({result:"bead"})
      })
	}

	@Get('getNomenclature')	
	async getFileNomenclature(
		@Query() query: {organization:string}
	){
		await this.iikoOrganizationServises.getFileMenu(query.organization)
	}

	@Post('updateWebHooks')
	async updateHooks(
		@Body() body: {
			organization:string
			localhoste:string
		}
	){
		await this.iikoOrganizationServises.iikkoHooks(body.organization,body.localhoste)
	}



}