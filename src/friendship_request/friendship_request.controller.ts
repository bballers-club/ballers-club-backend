import { Controller, Get, Post, Body, Delete, Param, Query } from '@nestjs/common';
import { FriendshipRequestService } from './providers/friendship_request.service';
import { CreateFriendshipRequestDto } from './dto/create-friendship_request.dto';
import { FriendshipRequestDto } from './dto/friendship_request.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OneFriendshipRequestDto } from './dto/one-friendship-request.dto';
import { FriendshipDto } from 'src/friendship/dto/friendship.dto';
import * as request from 'supertest';

@ApiTags('friendship-request')
@Controller('friendship-request')
export class FriendshipRequestController {
	constructor(
		private readonly friendshipRequestService: FriendshipRequestService,
	) {}

	@ApiTags('friendship-request')
	@ApiResponse({
		status: 201,
		description: 'Friendship request has been successfully sent',
		type: FriendshipRequestDto,
	})
	@Post()
	async createFriendshipRequest(
		@Body() createFriendshipRequestDto: CreateFriendshipRequestDto,
	): Promise<FriendshipRequestDto> {
		return await this.friendshipRequestService.create(
			createFriendshipRequestDto,
		);
	}

	@ApiTags('friendship-request')
	@ApiResponse({
		status: 200,
		description: 'Found all friendships requests',
		type: FriendshipRequestDto,
	})
	@Get()
	async findAll(): Promise<FriendshipRequestDto[]> {
		return await this.friendshipRequestService.findAll();
	}

	@ApiTags('friendship-request')
	@Get(':id')
	async findRequestedFriendshipsOfUser(@Param("id") id : string) : Promise<OneFriendshipRequestDto[]> {
		return await this.friendshipRequestService.getFriendshipRequestOfUser(id)
	}

	@ApiBody({
		type: String,
		description : "Body containing requestSenderId and requestReceiverId",
		examples : {
			requestSenderId : {
				description : "Id of the sender",
				value : "36c1351b-72d9-4681-9e9d-3593c9216729"
			},
			requestReceiverId : {
				description : "Id of the receiver",
				value : "4990afd5-9f9c-4f33-a9d9-1dbadd23bd78"
			}

		}
	})
	@Post('validate-friendship')
	async validateFriendshipRequest(@Body("senderId") userOneId : string, @Body("receiverId") userTwoId : string) : Promise<FriendshipDto> {
		
		return await this.friendshipRequestService.validateFriendshipRequest({
			userOneId : userOneId,
			userTwoId : userTwoId
		})
	}

	@ApiTags('friendship-request')
	@ApiResponse({
		status: 200,
		description: 'Friendship request canceled / denied successfully',
	})
	@ApiQuery({
		example : "friendship-request?requestSenderId=:senderId&requestReceiverId=:receiverId"
	})
	@Delete()
	async removeFriendshipRequest(
		@Query('requestSenderId') requestSenderId: string,
		@Query('requestReceiverId') requestReceiverId: string,
	) {
		return await this.friendshipRequestService.removeFriendshipRequest(
			requestSenderId,
			requestReceiverId,
		);
	}
}
