import { Module } from '@nestjs/common';
import { databaseProviders } from './supabase_database.provider';

@Module({
	providers: [...databaseProviders],
	exports: [...databaseProviders],
})
export class DatabaseModule {}
