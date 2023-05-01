import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PlaygroundRequest } from '../entity/playground_request.entity';
import { Repository } from 'typeorm';
import { z } from "zod"

@Injectable()
export class PlaygroundRequestService {

    constructor(
        @Inject('PLAYGROUND_REQUEST_REPOSITORY')
        private playgroundRequestRepository: Repository<PlaygroundRequest>,
    ) {}

    private playgroundRequestObjectValidator = z.object({
        id : z.string().uuid(),
        userId : z.string().uuid(),
        name : z.string(),
        address : z.string(),
        latitude : z.number(),
        longitude : z.number(),
    })

    async requestPlaygroundCreation(playgroundRequest: {
        userId : string;
        name : string;
        address : string;
        latitude : number;
        longitude : number
    }) : Promise<PlaygroundRequest> {
        try {
            const playgroundRequestValidated = this.playgroundRequestObjectValidator.omit({ id : true}).parse(playgroundRequest)

            const createdPlayground = this.playgroundRequestRepository.create({
                ...playgroundRequestValidated
            });
           
            return await this.playgroundRequestRepository.save(createdPlayground);
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

    async findAll() : Promise<PlaygroundRequest[]> {
        try {
           return await this.playgroundRequestRepository.find()
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

    async findOne(id: string) : Promise<PlaygroundRequest>{
        try {
            const validatedId = z.string().uuid().parse(id)

            return await this.playgroundRequestRepository.findOneBy({
                id : validatedId
            })
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

    async remove(id: number) : Promise<void> {
        try {
            const validatedId = z.string().uuid().parse(id)

            await this.playgroundRequestRepository.delete(validatedId)
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
