import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { User } from '../entity/user.entity';
import { z } from 'zod';

@Injectable()
export class UserService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
	) {}

	private userObjectValidator = z
		.object({
			id: z.string().uuid(),
			username: z.string(),
		})
		.partial({
			id: true,
			username: true,
		});

	async findAll(): Promise<User[]> {
		try {
			return await this.userRepository.find();
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

	async findOneById(id: string): Promise<User> {
		try {
			const validatedId = z.string().uuid().parse(id);

			return await this.userRepository.findOneBy({
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

	async create(user: {
		id: string,
		username: string,
		level: string,
		position: string,
		avatarUrl: string,
	}): Promise<User> {
		try {
			const validatedUserObjectWithoutId =
				this.userObjectValidator.parse(user);

			const createdUser = await this.userRepository.create({
				...validatedUserObjectWithoutId,
			});

			return await this.userRepository.save(createdUser);
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

			this.userRepository.delete(validatedId);
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
		user: {
			username?: string;
		},
	): Promise<User> {
		try {
			const validatedUser = this.userObjectValidator.parse(user);

			await this.userRepository.update(id, {
				...validatedUser,
			});

			return await this.findOneById(id);
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

	async findUsersByName(researchValue : string) : Promise<{id : string, username : string}[]> {
		try {
			const validatedResearchValue = z.string().parse(researchValue)

			return await this.userRepository.find({
				select : {
					username : true,
					id : true
					
				},
				where : {
					username : Like(`%${validatedResearchValue}%`)
				},
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
}
