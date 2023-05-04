import { Module } from '@nestjs/common';
import { FriendshipRequestService } from './providers/friendship_request.service';
import { FriendshipRequestController } from './friendship_request.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { friendshipRequestProvider } from './providers/friendship_request.provider';
import { friendshipProvider } from 'src/friendship/providers/friendship.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [FriendshipRequestController],
	providers: [
		...friendshipRequestProvider,
		...friendshipProvider,
		FriendshipRequestService,
	],
})
export class FriendshipRequestModule {}
