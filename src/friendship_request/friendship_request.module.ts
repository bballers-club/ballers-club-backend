import { Module } from '@nestjs/common';
import { FriendshipRequestService } from './friendship_request.service';
import { FriendshipRequestController } from './friendship_request.controller';

@Module({
  controllers: [FriendshipRequestController],
  providers: [FriendshipRequestService]
})
export class FriendshipRequestModule {}
