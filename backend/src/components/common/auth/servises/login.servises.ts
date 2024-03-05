import { Injectable, Logger, UnauthorizedException } from "@nestjs/common"
import { UsersRepository } from '../repository/users.repository'
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { BaseServises } from "src/services/base.services";

@Injectable()
export class LoginServises extends BaseServises{
  private readonly logger = new Logger(LoginServises.name)
  constructor(
    private readonly UsersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ){
		super(UsersRepository);
	}

  async validateUsers(name: string, password: string) {
    console.log(name,password)
    const user = await this.UsersRepository.getOneAdmin(name)
    this.logger.log(user);
    if (!user) {
			throw new UnauthorizedException();
    }
    const isCorrectPassword = await compare(password, user.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException();
		}
		return user
  }
  async getJwtToken(name:string) {
    console.log('namee',name,process.env.SESSION_SECRET);
		
		return await this.jwtService.signAsync(
			{
				name
			},
			{
				secret: process.env.SESSION_SECRET,
			}
		)
		
  }

	async getRefreshToken(userName: string): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().day(1 + 10).format('YYYY/MM/DD'),
    };

    await this.UsersRepository.updateUser(userName, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

	async validRefreshToken(
    name: string,
    refreshToken: string,
  ){
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    let user = await this.UsersRepository.getOneToken({
      
        name: name,
        refreshToken: refreshToken,
      
    });

    if (!user) {
      return null;
    }
		return user
  }

	async getUser(name:string){
		const user = await this.UsersRepository.getOneAdmin(name)
		return user
	}
}