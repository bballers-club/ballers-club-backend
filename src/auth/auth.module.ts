import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseStrategy } from 'src/supabase_auth/supabase_auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { SupabaseAuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [PassportModule,UserModule],
	controllers: [AuthController],
	providers: [
		SupabaseStrategy,
		{
			provide: APP_GUARD,
			useClass: SupabaseAuthGuard,
		}
	],
})
export class AuthModule {}
