import { Body, Controller, Get,Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginServises } from "../servises/login.servises";
import { AuthGuard } from "@nestjs/passport";
import { Response } from 'express';


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
		const refreshToken = await this.LoginServises.getRefreshToken(
      req.body.name,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return  {msg:'success'}; 
  }

  
  @Get('checkauth')
	@UseGuards(AuthGuard('jwt'))
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

  
}