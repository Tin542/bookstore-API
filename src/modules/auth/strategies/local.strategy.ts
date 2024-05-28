import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from 'src/dtos/auth/signin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({});
	}

	async validate(username: string, password: string) {
		const user = await this.authService.getAuthenticatedUser(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
