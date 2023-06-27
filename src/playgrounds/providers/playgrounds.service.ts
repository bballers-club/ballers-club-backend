import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Playground } from '../entity/playground.entity';
import { ILike, Repository } from 'typeorm';
import { z } from 'zod';

@Injectable()
export class PlaygroundsService {
	private playgroundObjectValidator = z.object({
		name: z.string(),
		address: z.string(),
		country: z.string(),
		city: z.string(),
		zipcode: z.string(),
		latitude: z.number(),
		longitude: z.number(),
	});

	constructor(
		@Inject('PLAYGROUND_REPOSITORY')
		private playgroundRepository: Repository<Playground>,
	) {}

	async findAll(query: String, page: number, size: number): Promise<Playground[]> {
		const parsedPage = z.number().int().positive().parse(page);
		const parsedSize = z.number().int().positive().parse(size);
		const queryValidated = z.string().parse(query);
		try {
			return await this.playgroundRepository.find(
				{
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
				}
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
	async findOneById(id: string): Promise<Playground> {
		try {
			const idValidated = z.string().uuid().parse(id);

			return await this.playgroundRepository.findOneBy({
				id: idValidated,
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
	async create(playground: {
		name: string;
		address: string;
		country: string;
		city: string;
		zipcode: string;
		latitude: number;
		longitude: number;
	}): Promise<Playground> {
		try {
			const playgroundValidated =
				this.playgroundObjectValidator.parse(playground);

			const createdPlayground = await this.playgroundRepository.create({
				...playgroundValidated,
			});

			return await this.playgroundRepository.save(createdPlayground);
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
	async update(
		id: string,
		playground: {
			name?: string;
			address?: string;
			country?: string;
			city?: string;
			zipcode?: string;
			latitude?: number;
			longitude?: number;
		},
	): Promise<Playground> {
		try {
			const validatedId = z.string().uuid().parse(id);
			const validatedPlayground =
				this.playgroundObjectValidator.parse(playground);

			await this.playgroundRepository.update(validatedId, {
				...validatedPlayground,
			});

			return await this.findOneById(validatedId);
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
	async delete(id: string): Promise<void> {
		try {
			const validatedId = z.string().uuid().parse(id);

			await this.playgroundRepository.delete(validatedId);
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
	async findPlaygroundsAroundPlayer(
		latitude: number,
		longitude: number,
		radius: number,
	): Promise<Playground[]> {
		try {
			const playgrounds = await this.findAll(
				'',
				1,
				Number.MAX_SAFE_INTEGER,
			);
			const playgroundsInRadius: Playground[] = [];
			const validatedLatitude = z.number().parse(latitude);
			const validatedLongitude = z.number().parse(longitude);
			if (playgrounds.length > 0) {
				playgrounds.forEach((playground) => {
					const validatedRadius = z.number().parse(radius);

					const dist = this.calculateDistanceBetweenPositions(
						validatedLatitude,
						validatedLongitude,
						playground.latitude,
						playground.longitude,
					);

					if (validatedRadius >= dist) {
						playgroundsInRadius.push(playground);
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

	calculateDistanceBetweenPositions(
		latitude1: number,
		longitude1: number,
		latitude2: number,
		longitude2: number,
	): number {
		let dist = 1;
		const validatedLatitude1 = latitude1;
		const validatedLongitude1 = longitude1;
		const validatedLatitude2 = z.number().parse(latitude2);
		const validatedLongitude2 = z.number().parse(longitude2);

		const radlat1 = (Math.PI * validatedLatitude1) / 180;
		const radlat2 = (Math.PI * validatedLatitude2) / 180;
		const theta = validatedLongitude1 - validatedLongitude2;
		const radtheta = (Math.PI * theta) / 180;
		dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		//We'll turn the value into meters
		dist = dist * 60 * 1.1515 * 1.609344 * 1000;

		return dist;
	}

	async validatePlaygroundRequested(playground_id : string,request_pending : boolean) : Promise<Playground> {
		try {
			const validated_playground_id = z.string().uuid().parse(playground_id);

			await this.playgroundRepository.update(validated_playground_id,{
				request_pending : request_pending
			});

			return await this.findOneById(playground_id);
			
		} catch (error) {
			throw new HttpException(
				{
					status: error.status,
					error: error.message,
				},
				error.status,
				{
					cause: error,
				},
			);
		}
	}
}
