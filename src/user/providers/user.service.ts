import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
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
			avatarUrl: z.string(),
			position: z.string(),
			level: z.string(),
		})
		.partial({
			id: true,
			username: true,
			avatarUrl: true,
			position: true,
			level: true,
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
		id: string;
		username: string;
		level: string;
		position: string;
		avatarUrl?: string;
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

			await this.userRepository.delete(validatedId);
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
			avatarUrl?: string;
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

	async findUsersByName(
		researchValue: string,
	): Promise<{ id: string; username: string }[]> {
		try {
			const validatedResearchValue = z.string().parse(researchValue);

			return await this.userRepository.find({
				select: {
					username: true,
					avatarUrl: true,
					id: true,
				},
				where: {
					username: ILike(`%${validatedResearchValue}%`),
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
