import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { FriendshipRequest } from '../entity/friendship_request.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';


@Injectable()
export class FriendshipRequestService {

    constructor(
		@Inject('FRIENDSHIP_REQUEST_REPOSITORY')
		private friendshipRequestRepository: Repository<FriendshipRequest>,
	) {}

    private friendshipRequestValidator = z.object({
       requestSenderId : z.string().uuid(),
       requestReceiverId : z.string().uuid() 
    });

    async create(createFriendshipRequest: {requestSenderId : string,requestReceiverId : string }) : Promise<FriendshipRequest> {
        try{
			const validatedFriendshipRequest = this.friendshipRequestValidator.parse(createFriendshipRequest);

            const createdFriendshipRequest = await this.friendshipRequestRepository.create({
                ...validatedFriendshipRequest
            })

            return await this.friendshipRequestRepository.save(createdFriendshipRequest)
		}
		catch(error){
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
		}
    }

    async findAll() : Promise<FriendshipRequest[]> {
        try{
			return await this.friendshipRequestRepository.find();
		}
		catch(error){
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
		}
    }

    async removeFriendshipRequest(requestSenderId: string, requestReceiverId : string) : Promise<void> {
        try{
            const validatedFriendshipRequest = this.friendshipRequestValidator.parse({
                requestSenderId : requestSenderId,
                requestReceiverId : requestReceiverId
            });

			await this.friendshipRequestRepository.delete({
                requestSenderId : validatedFriendshipRequest.requestSenderId,
                requestReceiverId : validatedFriendshipRequest.requestReceiverId
            });
		}
		catch(error){
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
		}
    }
}
