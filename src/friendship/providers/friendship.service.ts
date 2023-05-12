import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Friendship } from '../entity/friendship.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { OneUserFriendshipDTO } from '../dto/one-user-friendship.dto';

@Injectable()
export class FriendshipService {
	constructor(
		@Inject('FRIENDSHIP_REPOSITORY')
		private friendshipRepository: Repository<Friendship>,
	) {}

	private friendshipObjectValidator = z.object({
		userOneId: z.string().uuid(),
		userTwoId: z.string().uuid(),
	});

	async findAll(): Promise<Friendship[]> {
		try {
			return await this.friendshipRepository.find();
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
		}
	}
	async findAllFriendshipOfOneUser(
		currentUser: string,
	): Promise<OneUserFriendshipDTO[]> {
		try {
			const validatedId = z.string().uuid().parse(currentUser);
			const foundFriends = await this.friendshipRepository.find({
				where: [{ userOneId: validatedId }, { userTwoId: validatedId }],
				relations: {
					userOne: true,
					userTwo: true,
				},
			});

			const formattedFriends: OneUserFriendshipDTO[] = [];

			foundFriends.map((data) => {
				if (data.userOneId === validatedId) {
					formattedFriends.push({
						userId: data.userTwoId,
						username: data.userTwo.username,
						avatarUrl: data.userTwo.avatarUrl,
						gamesWon: data.userTwo.gamesWon,
						gamesLost: data.userTwo.gamesLost,
						totalGames: data.userTwo.gamesPlayed,
					});
				} else if (data.userTwoId === validatedId) {
					formattedFriends.push({
						userId: data.userOneId,
						username: data.userOne.username,
						avatarUrl: data.userOne.avatarUrl,
						gamesWon: data.userOne.gamesWon,
						gamesLost: data.userOne.gamesLost,
						totalGames: data.userOne.gamesPlayed,
					});
				}
			});

			return formattedFriends;
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
		}
	}

	async create(friendship: {
		userOneId: string;
		userTwoId: string;
	}): Promise<Friendship> {
		try {
			const validatedFriendship =
				this.friendshipObjectValidator.strict().parse(friendship);
			await this.friendshipRepository.create({
				...validatedFriendship,
			});

			return await this.friendshipRepository.save(validatedFriendship);
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
		}
	}

	async deleteFriendship(friendship: {
		userOneId: string;
		userTwoId: string;
	}): Promise<void> {
		try {
			const currentUserValidatedId = z
				.string()
				.uuid()
				.parse(friendship.userOneId);
			const userFriendValidatedId = z
				.string()
				.uuid()
				.parse(friendship.userTwoId);

			await this.friendshipRepository.delete({
				userOneId: currentUserValidatedId,
				userTwoId: userFriendValidatedId,
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
		}
	}

	async verifyIfFriendshipExist(friendship : {
		userOneId : string;
		userTwoId : string
	}) : Promise<Boolean> {
		try {
			const validatedFriendshipObject = this.friendshipObjectValidator.parse(friendship)

			const friendshipExistFirstCheck =
				await this.friendshipRepository.findBy({
					userOneId: validatedFriendshipObject.userOneId,
					userTwoId: validatedFriendshipObject.userTwoId,
				});

			const friendshipExistSecondCheck =
				await this.friendshipRepository.findBy({
					userOneId: validatedFriendshipObject.userTwoId,
					userTwoId: validatedFriendshipObject.userOneId,
				});

			return (friendshipExistFirstCheck.length > 0 && friendshipExistSecondCheck.length > 0)

		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
		}
	}
}

