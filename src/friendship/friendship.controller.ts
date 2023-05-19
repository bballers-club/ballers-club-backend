import { Body, Controller, Get, Param, Post, Delete, Query } from '@nestjs/common';
import { FriendshipService } from './providers/friendship.service';
import { Friendship } from './entity/friendship.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FriendshipDto } from './dto/friendship.dto';
import { DeleteFriendshipDto } from './dto/delete-friendship.dto';
import { OneUserFriendshipDTO } from './dto/one-user-friendship.dto';

@Controller('friendship')
export class FriendshipController {
	constructor(private readonly friendshipService: FriendshipService) {}

	@ApiResponse({
		status: 200,
		type: FriendshipDto,
	})
	@ApiTags('friendship')
	@Get()
	async findAllFriendships(): Promise<Friendship[]> {
		return await this.friendshipService.findAll();
	}

	@ApiResponse({
		status: 200,
		type: FriendshipDto,
	})
	@ApiTags('friendship')
	@Get(':id')
	async findFriendshipsOfUser(@Param('id') id: string, @Query('query') query: string): Promise<{
		friendsInformations: OneUserFriendshipDTO[];
		totalFriendship: number;
	}> {
		const friendships =
			await this.friendshipService.findAllFriendshipOfOneUser(id, query);
		return {
			friendsInformations: friendships,
			totalFriendship: friendships.length,
		};
	}

	@ApiResponse({
		status: 201,
		type: FriendshipDto,
	})
	@ApiTags('friendship')
	@Post()
	async createFriendship(
		@Body() friendship: CreateFriendshipDto,
	): Promise<Friendship> {
		return await this.friendshipService.create(friendship);
	}

	@ApiResponse({
		status: 200,
		type: null,
	})
	@ApiBody({
		type: DeleteFriendshipDto,
	})
	@ApiTags('friendship')
	@Delete()
	async deleteFriendship(
		@Body('friendship') friendship: DeleteFriendshipDto,
	): Promise<void> {
		return await this.friendshipService.deleteFriendship(friendship);
	}
}
