import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PlaygroundRequest } from '../entity/playground_request.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { PlaygroundsService } from '../../playgrounds/providers/playgrounds.service';

@Injectable()
export class PlaygroundRequestService {
	constructor(
		@Inject('PLAYGROUND_REQUEST_REPOSITORY')
		private playgroundRequestRepository: Repository<PlaygroundRequest>,
		private readonly playgroundsService: PlaygroundsService,
	) {}

	private playgroundRequestObjectValidator = z.object({
		id: z.string().uuid(),
		userId: z.string().uuid(),
		name: z.string(),
		address: z.string(),
		city: z.string(),
		country: z.string(),
		zipcode: z.string(),
		latitude: z.number(),
		longitude: z.number(),
	});

	async requestPlaygroundCreation(playgroundRequest: {
		userId: string;
		name: string;
		address: string;
		city: string;
		zipcode: string;
		country: string;
		latitude: number;
		longitude: number;
	}): Promise<PlaygroundRequest> {
		try {
			const playgroundRequestValidated =
				this.playgroundRequestObjectValidator
					.omit({ id: true })
					.parse(playgroundRequest);

			const createdPlayground = this.playgroundRequestRepository.create({
				...playgroundRequestValidated,
			});

			return await this.playgroundRequestRepository.save(
				createdPlayground,
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

	async findAll(): Promise<PlaygroundRequest[]> {
		try {
			return await this.playgroundRequestRepository.find();
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

	async findOne(id: string): Promise<PlaygroundRequest> {
		try {
			const validatedId = z.string().uuid().parse(id);

			return await this.playgroundRequestRepository.findOneBy({
				id: validatedId,
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

	async remove(id: number): Promise<void> {
		try {
			const validatedId = z.string().uuid().parse(id);

			await this.playgroundRequestRepository.delete(validatedId);
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

	async findPlaygroundRequestsAroundPlayer(
		radius: number,
		latitude: number,
		longitude: number,
	): Promise<PlaygroundRequest[]> {
		try {
			const validatedRadius = z.number().parse(radius);
			const validatedLatitude = z.number().parse(latitude);
			const validatedLongitude = z.number().parse(longitude);

			const playgroundRequests = await this.findAll();
			const playgroundsInRadius: PlaygroundRequest[] = [];
			if (playgroundRequests.length > 0) {
				playgroundRequests.forEach((playgroundRequest) => {
					const dist =
						this.playgroundsService.calculateDistanceBetweenPositions(
							validatedLatitude,
							validatedLongitude,
							playgroundRequest.latitude,
							playgroundRequest.longitude,
						);

					if (validatedRadius >= dist) {
						playgroundsInRadius.push(playgroundRequest);
					}
				});
			}

			return playgroundsInRadius;
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
