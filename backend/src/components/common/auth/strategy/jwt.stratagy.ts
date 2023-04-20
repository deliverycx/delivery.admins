import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminUsersModel } from 'src/database/mongodbModel/admin/users.model';


@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
      secretOrKey: 'kek'
		});
	}

	async validate({ name }: Pick<AdminUsersModel, 'name'>) {
		return name;
	}
}