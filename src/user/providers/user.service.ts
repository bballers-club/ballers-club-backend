import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/user.model';
import { z } from "zod";
import { CRUDFunctions } from '../../interfaces/repository.interface';

@Injectable()
export class UserService implements CRUDFunctions<User> {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
	) {}

	private userObjectValidator = z.object({
		"id" : z.string().uuid(),
		"username" : z.string(),
		"email" : z.string().email()
	});

	async findAll(): Promise<User[]> {
		try{
			return await this.userRepository.find();
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

	async findOneById(id : string): Promise<User> {
		try{

			const validatedId = z.string().uuid().parse(id);

			return await this.userRepository.findOneBy({
				id : validatedId
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

	async create(user : User): Promise<User> {
		try{
			const validatedUserObjectWithoutId = this.userObjectValidator.parse(user);

			const createdUser = await this.userRepository.create({
				...validatedUserObjectWithoutId
			})

			return await this.userRepository.save(createdUser)
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

	async delete(id : string) : Promise<void> {
		try{
			const validatedId = z.string().uuid().parse(id);

			this.userRepository.delete(validatedId)

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

	async update(id: string, user : User) : Promise<User> {
		try{
			const validatedUser = this.userObjectValidator.omit({"id" : true}).parse(user);

			await this.userRepository.update(id,{
				...validatedUser
			})

			return await this.findOneById(id);
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
