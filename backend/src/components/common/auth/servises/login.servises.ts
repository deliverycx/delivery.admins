import { Injectable, Logger, UnauthorizedException } from "@nestjs/common"
import { UsersRepository } from '../repository/users.repository'
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginServises{
  private readonly logger = new Logger(LoginServises.name)
  constructor(
    private readonly UsersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ){}

  async validateUsers(name: string, password: string) {
    console.log(name,password)
    const user = await this.UsersRepository.getOne(name)
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
  async login(name:string) {
    const payload = { name };
    console.log('name',await this.jwtService.signAsync(payload));
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
  }
}