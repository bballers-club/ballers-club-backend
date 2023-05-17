import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { UserFavoritePlaygroundService } from './providers/user-favorite-playground.service';
import { CreateUserFavoritePlaygroundDto } from './dto/create-user-favorite-playground.dto';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserFavoritePlaygroundDto } from './dto/user-favorite-playground.dto';
import { UserFavoritePlayground } from './entity/user-favorite-playground.entity';

@ApiTags('user-favorite-playground')
@Controller('user-favorite-playground')
export class UserFavoritePlaygroundController {
	constructor(
		private readonly userFavoritePlaygroundService: UserFavoritePlaygroundService,
	) {}

	@ApiResponse({
		description: 'Route to add favorite for a user',
		type: UserFavoritePlaygroundDto,
	})
	@Post()
	async addFavorite(
		@Body()
		createUserFavoritePlaygroundDto: CreateUserFavoritePlaygroundDto,
	): Promise<UserFavoritePlayground> {
		return await this.userFavoritePlaygroundService.create(
			createUserFavoritePlaygroundDto,
		);
	}

	@Get(':id')
	async findUserFavorites(
		@Param('id') userId: string,
	): Promise<UserFavoritePlayground[]> {
		const favorites =
			await this.userFavoritePlaygroundService.findAllFavoriteOfUser(
				userId,
			);
		const playgrounds = [];
		for (let i = 0; i < favorites.length; i++) {
			playgrounds.push(favorites[i].playground);
		}
		return playgrounds;
	}

	@ApiQuery({
		example:
			'user-favorite-playground?userId=:userId&playgroundId=:playgroundId',
	})
	@Delete()
	removeFavorite(
		@Query('userId') userId: string,
		@Query('playgroundId') playgroundId: string,
	): Promise<Record<string, string>> {
		return this.userFavoritePlaygroundService.removeFavorite(
			userId,
			playgroundId,
		);
	}
}
