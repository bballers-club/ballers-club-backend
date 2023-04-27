import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendshipRequestService } from './providers/friendship_request.service';
import { CreateFriendshipRequestDto } from './dto/create-friendship_request.dto';
import { FriendshipRequestDto } from './dto/friendship_request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('friendship-request')
export class FriendshipRequestController {
  	constructor(private readonly friendshipRequestService: FriendshipRequestService) {}

	@ApiTags("friendship-request")
	@ApiResponse({
		status : 201,
		description : "Friendship request has been successfully sent",
		type : FriendshipRequestDto
	})
	@Post()
	async createFriendshipRequest(@Body() createFriendshipRequestDto: CreateFriendshipRequestDto) : Promise<FriendshipRequestDto> {
			return await this.friendshipRequestService.create(createFriendshipRequestDto);
	}

	@ApiTags("friendship-request")
  	@ApiResponse({
		status : 200,
		description : "Found all friendships requests",
		type : FriendshipRequestDto
	})
	@Get()
	async findAll() : Promise<FriendshipRequestDto[]> {
			return await this.friendshipRequestService.findAll();
	}

	@ApiTags("friendship-request")
	@ApiResponse({
		status : 200,
		description : "Friendship request canceled / denied successfully"
	})
	@Delete()
	async removeFriendshipRequest(@Body('requestReceiverId') requestSenderId: string, @Body('requestReceiverId') requestReceiverId : string) {
			return await this.friendshipRequestService.removeFriendshipRequest(requestSenderId, requestReceiverId);
	}
}