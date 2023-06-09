import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { config } from 'dotenv';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
	SupabaseAuthStrategy,
	'supabase',
	
) {
	public constructor() {
		config();

		super({
			supabaseUrl: process.env.SUPABASE_URL,
			supabaseKey: process.env.SUPABASE_KEY,
			supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
			extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: any): Promise<any> {
		super.validate(payload);
	}

	authenticate(req) {
		super.authenticate(req);
	}
}
