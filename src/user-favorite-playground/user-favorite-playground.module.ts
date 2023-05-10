import { Module } from '@nestjs/common';
import { UserFavoritePlaygroundService } from './providers/user-favorite-playground.service';
import { UserFavoritePlaygroundController } from './user-favorite-playground.controller';
import { userFavoritePlaygroundProvider } from './providers/user-favorite-playground.provider';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserFavoritePlaygroundController],
  providers: [...userFavoritePlaygroundProvider,UserFavoritePlaygroundService]
})
export class UserFavoritePlaygroundModule {}
