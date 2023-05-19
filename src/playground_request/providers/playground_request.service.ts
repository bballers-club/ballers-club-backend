import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PlaygroundRequest } from '../entity/playground_request.entity';
import { ILike, Repository } from 'typeorm';
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

	async findAll(query: String, page: number, size: number): Promise<PlaygroundRequest[]> {
		const parsedPage = z.number().int().positive().parse(page);
		const parsedSize = z.number().int().positive().parse(size);
		const queryValidated = z.string().parse(query);
		try {
			const  playgrounds = await this.playgroundRequestRepository.find({
				where: [
					{name: ILike(`%${queryValidated}%`)},
					{country: ILike(`%${queryValidated}%`)},
					{city: ILike(`%${queryValidated}%`)},
				],
				skip: (parsedPage - 1) * parsedSize,
				take: parsedSize,
				order: {
					name: 'ASC',
				},
			});
			console.log(playgrounds);
			return playgrounds;
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

			const playgroundRequests = await this.findAll(
				'',
				1,
				Number.MAX_SAFE_INTEGER,
			);
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
