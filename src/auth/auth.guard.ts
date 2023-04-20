import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/skip_auth.decorator';
import { Reflector } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('jwt') implements CanActivate  {

	private supabaseClientInstance : SupabaseClient
	constructor(private reflector: Reflector) {
		super()
		config()
	}


  async canActivate(context: ExecutionContext): Promise<boolean>  {

	const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
	  context.getHandler(),
	  context.getClass(),
	]);
	if (isPublic) {
	  return true;
	}

	const request = context.switchToHttp().getRequest();
	const token = this.extractTokenFromHeader(request);
	if (!token) {
	  throw new UnauthorizedException();
	}

	//Create a client to check wether the user is already authenticated or not
	this.supabaseClientInstance = createClient( 
		process.env.SUPABASE_URL,
		process.env.SUPABASE_KEY,
		{ 
			auth : {
				autoRefreshToken: true,
				detectSessionInUrl: false,
			}
		}
	)

	//If an error is raised, means no session existing for this user otherwise no errors are raised
	const {error} = await this.supabaseClientInstance.auth.getUser(token)
	
	if(error){
		throw new UnauthorizedException();
	}

	return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
	const [type, token] = request.headers.authorization?.split(' ') ?? [];
	return type === 'Bearer' ? token : undefined;
  }
}

