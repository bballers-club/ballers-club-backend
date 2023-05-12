import {
	Injectable,
	Inject,
	HttpException,
	HttpStatus,
	ForbiddenException,
} from '@nestjs/common';
import { FriendshipRequest } from '../entity/friendship_request.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { Friendship } from 'src/friendship/entity/friendship.entity';
import { OneFriendshipRequestDto } from '../dto/one-friendship-request.dto';

@Injectable()
export class FriendshipRequestService {
	constructor(
		@Inject('FRIENDSHIP_REQUEST_REPOSITORY')
		private friendshipRequestRepository: Repository<FriendshipRequest>,
		@Inject('FRIENDSHIP_REPOSITORY')
		private friendshipRepository: Repository<Friendship>,
	) {}

	private friendshipRequestValidator = z.object({
		requestSenderId: z.string().uuid(),
		requestReceiverId: z.string().uuid(),
	});

	async getFriendshipRequestOfUser(id : string) : Promise<OneFriendshipRequestDto[]> {
		try {
			const validatedId = z.string().uuid().parse(id);

			const userFriendshipsRequest = await this.friendshipRequestRepository.find({
				where : {
					requestReceiverId : validatedId
				},
				relations : {
					requestSender : true
				}
			});
			const requests : OneFriendshipRequestDto[] = []

			if(userFriendshipsRequest.length > 0){
				userFriendshipsRequest.forEach((request) => {
					requests.push({
						requestSenderId : request.requestSenderId,
						requestReceiverId : request.requestReceiverId,
						requesterUsername : request.requestSender.username
					})
				})
			}

			return requests;

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

	async create(createFriendshipRequest: {
		requestSenderId: string;
		requestReceiverId: string;
	}): Promise<FriendshipRequest> {
		try {
			const validatedFriendshipRequest =
				this.friendshipRequestValidator.parse(createFriendshipRequest);

			const friendshipExist = await this.verifyIfFriendshipExist(
				validatedFriendshipRequest.requestSenderId,
				validatedFriendshipRequest.requestSenderId,
			);

			if (friendshipExist) {
				return Promise.reject(
					new ForbiddenException(
						'Friendship already exist or request already pending',
					),
				);
			}

			const createdFriendshipRequest =
				await this.friendshipRequestRepository.create({
					...validatedFriendshipRequest,
				});

			return await this.friendshipRequestRepository.save(
				createdFriendshipRequest,
			);
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

	async findAll(): Promise<FriendshipRequest[]> {
		try {
			return await this.friendshipRequestRepository.find();
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

	async removeFriendshipRequest(
		requestSenderId: string,
		requestReceiverId: string,
	): Promise<void> {
		try {
			const validatedFriendshipRequest =
				this.friendshipRequestValidator.parse({
					requestSenderId: requestSenderId,
					requestReceiverId: requestReceiverId,
				});

			await this.friendshipRequestRepository.delete({
				requestSenderId: validatedFriendshipRequest.requestSenderId,
				requestReceiverId: validatedFriendshipRequest.requestReceiverId,
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

	async verifyIfFriendshipExist(
		requestSender: string,
		requestReceiver: string,
	): Promise<boolean> {
		try {
			let exist = false;

			//Gotta check all the cases before validating
			const firstCheck = await this.friendshipRequestRepository.findBy({
				requestSenderId: requestSender,
				requestReceiverId: requestReceiver,
			});

			const secondCheck = await this.friendshipRequestRepository.findBy({
				requestSenderId: requestReceiver,
				requestReceiverId: requestSender,
			});

			const friendshipExistFirstCheck =
				await this.friendshipRepository.findBy({
					userOneId: requestSender,
					userTwoId: requestReceiver,
				});

			const friendshipExistSecondCheck =
				await this.friendshipRepository.findBy({
					userOneId: requestReceiver,
					userTwoId: requestSender,
				});

			if (
				firstCheck.length > 0 ||
				secondCheck.length > 0 ||
				friendshipExistFirstCheck.length > 0 ||
				friendshipExistSecondCheck.length > 0
			) {
				exist = true;
			}

			return exist;
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
