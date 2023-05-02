import { Module } from '@nestjs/common';
import { FriendshipService } from './providers/friendship.service';
import { FriendshipController } from './friendship.controller';
import { friendshipProvider } from './providers/friendship.provider';
import { DatabaseModule } from '../supabase_database/supabase_database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendshipController],
  providers: [...friendshipProvider, FriendshipService],
})
export class FriendshipModule {}
