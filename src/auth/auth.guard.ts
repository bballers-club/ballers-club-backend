import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/skip_auth.decorator';
import { Reflector } from '@nestjs/core';
import { supabaseClient } from '../main';
import { config } from 'dotenv';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('jwt') implements CanActivate {
	constructor(private reflector: Reflector) {
		super();
		config();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(
			IS_PUBLIC_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException();
		}

		//If an error is raised, means no session existing for this user otherwise no errors are raised
		const { data,error } = await supabaseClient.auth.getUser(token);
		
		if (error) {
			throw new UnauthorizedException();
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
