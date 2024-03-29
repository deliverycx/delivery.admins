import { Body, Controller, Get,Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginServises } from "../servises/login.servises";
import { AuthGuard } from "@nestjs/passport";
import { Response } from 'express';
import OrganizationDTO from "src/components/core/organization/dto/organization.dto";
import { AuthJWTGuard } from "src/guard/auth.guard";


@Controller("autorizate")
export class LoginController {
  constructor(
    private readonly LoginServises: LoginServises
  ) { }
  
  //@UseGuards(LocalAuthGuard)
	@UseGuards(AuthGuard('local'))
  @Post("login")
  async autoriz(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.LoginServises.getJwtToken(req.body.name)
		console.log('login token',token);
		const refreshToken = await this.LoginServises.getRefreshToken(
      req.body.name,
    );
		const byUser = await this.LoginServises.getUser(req.body.name)
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			expires: new Date(Date.now() + 40 * 24 * 60 * 90000),
	});
    return  byUser; 
  }

	
  @Get('checkauth')
	@UseGuards(AuthJWTGuard)
  async checkAuth(){
    return true
  }


	@Get('refresh-tokens')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.LoginServises.getJwtToken(req.body.name);
    const refreshToken = await this.LoginServises.getRefreshToken(
      req.body.name
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
		return   {msg:'success'};
	}

	@Get('buallorg')
	async userBuOrg(
    @Query() query: OrganizationDTO
  ) {
    return await this.LoginServises.getAll(query)
	}

  @Post('delet')
	async delete(
		@Query() query: OrganizationDTO,
	){
		return this.LoginServises.delete(query.id)
	}
}