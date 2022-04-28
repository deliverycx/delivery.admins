import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginServises } from '../servises/login.servises';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private LoginServises: LoginServises) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.LoginServises.validateUsers(username, password);
    console.log('user',user);
    if (!user) {
      throw new UnauthorizedException()
    }
    return user;
  }
}