import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { User } from '../entity/user.entity';
import { string, z } from 'zod';
import { supabaseClient } from 'src/main';
import { DateUtils } from 'src/utils/date.utils';

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
			email: z.string().email()
		})
		.partial({
			id: true,
			username: true,
			position: true,
			level: true,
		})

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
		email ?: string;
		username: string;
		level: string;
		position: string;
		avatarUrl?: string;
	}): Promise<User> {
		try {

			const {data,error} = await supabaseClient.auth.admin.getUserById(user.id);

			if(error){
				throw new HttpException(error, HttpStatus.BAD_REQUEST);
			}
		
			const createdUser = await this.userRepository.create({
				id : user.id,
				email : data.user.email,
				username : user.username,
				level : user.level,
				position : user.position,
				avatarUrl: user.avatarUrl
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

	async delete(id: string, user_that_delete : string): Promise<string> {
		try {
			const [type, token] = user_that_delete.split(' ') ?? [];
			const {data} = await supabaseClient.auth.getUser(token);
	
			const userHasBannedData = await this.findOneById(data.user.id);

			if(userHasBannedData.role != "admin")
			{
				throw new HttpException('Unauthorized action', HttpStatus.FORBIDDEN);

			}
			const validatedId = z.string().uuid().parse(id);

			await this.userRepository.delete(validatedId);

			const {error} = await supabaseClient.auth.admin.deleteUser(validatedId, false);

			if(error){
				throw new HttpException('An error occurred while trying to delete',400);
			}

			return validatedId;
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
			email?: string;
		},
	): Promise<User> {
		try {
			
			

			if(user.email != null && user.email.length > 0){
				const validated_email = z.string().email().parse(user.email)

				const {error} = await supabaseClient.auth.admin.updateUserById(id, {
					email : validated_email
				});

				if(error){
					throw new HttpException("Invalid parameters",HttpStatus.BAD_REQUEST);
				}
	
			}
			
			
			await this.userRepository.update(id, {
				...user,
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

	async createUserFromApi(email : string, password : string, username : string, level : string, position : string) : Promise<User> {
		try {
			const { data, error } = await supabaseClient.auth.signUp({
				email: email,
				password: password,
			})
			
			if(!error){

				return await this.create({
					id : data.user.id,
					username : z.string().parse(username),
					level : z.string().parse(level),
					position : z.string().parse(position),
					email : z.string().email().parse(email)
				})
			}

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

	async usersForBackOffice(researchValue : string = "") : Promise<{
		id : string,
		username : string,
		email : string,
		createdAt : string,
		is_banned: Boolean
	}[]> {
		try {
			
			const dataToReturn : {
				id : string,
				username : string,
				email : string,
				createdAt : string,
				is_banned : Boolean
			}[] = [];

			let users : User[];
			
			if(researchValue.length > 1){
				users = await this.userRepository.find({
					where: [
						{
							username: ILike(`%${researchValue}%`),
						},
						{
							email : ILike(`%${researchValue}%`)
						}
					]
						
					,
				});
			}
			else{
				users = await this.findAll();
			}

			

			for(const user of users){
				dataToReturn.push({
					id : user.id,
					username : user.username,
					email : user.email,
					createdAt : user.createdAt.toString(),
					is_banned : user.is_banned
				})
			}
					
			
			return dataToReturn;

		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
		}
	}

	async banUser(id : string, duration : number, userThatBanned : string) : Promise<string> {
		try{
			
			const validatedId = z.string().uuid().parse(id);
			const [type, token] = userThatBanned.split(' ') ?? [];
			const {data} = await supabaseClient.auth.getUser(token);
	
			const userHasBannedData = await this.findOneById(data.user.id);

			if(userHasBannedData.role != "admin")
			{
				throw new HttpException('Unauthorized action', HttpStatus.FORBIDDEN);
			}

			

			const {error} = await supabaseClient.auth.admin.updateUserById(validatedId,{
				ban_duration : `${duration}h`
			})

			if(error){
				throw new HttpException("Error occured while trying to ban user", 400);
			}
			const banned_until = DateUtils.addHoursToCurrentDate(duration)
			await this.userRepository.update(validatedId,{
				banned_until : banned_until,
				is_banned : true
			})

			return validatedId;

		}
		catch(error){
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

	async unbanUser(id : string, userThatBanned : string) : Promise<string> {
		try{
			const validatedId = z.string().uuid().parse(id);
			const [type, token] = userThatBanned.split(' ') ?? [];
			const {data} = await supabaseClient.auth.getUser(token);

			const userHasBannedData = await this.findOneById(data.user.id);

			if(userHasBannedData.role != "admin")
			{
				throw new HttpException('Unauthorized action', HttpStatus.FORBIDDEN);
			}

			const {error} = await supabaseClient.auth.admin.updateUserById(id,{
				ban_duration : "none"
			})
		
			if(error){
				throw new HttpException("Error occured while trying to unban user", 400);
			}

			await this.userRepository.update(validatedId,{
				banned_until : null,
				is_banned : false
			})

			return validatedId;
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
				},
			);
		}
	}

	async updateForBackoffice(
		id: string,
		user: {
			id ?: string;
			username?: string;
			email?: string;
			createdAt ?: string;
		},
	): Promise<{
			id : string,
			username : string,
			email : string,
			createdAt : string
			is_banned: Boolean
		}[]> {
		try {
			

			if(user.email != undefined && user.email.length > 0)
			{
				const {error} = await supabaseClient.auth.admin.updateUserById(id, {
					email : user.email
				});

				if(error){
					throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
				}
			}
			
		
			await this.userRepository.update(id, {
				...user,
			});

			return await this.usersForBackOffice();
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

	async findUserByEmail(email : string): Promise<User> {
		try{
			const validatedEmail = z.string().email().parse(email);

			return await this.userRepository.findOne({
				where: {
					email : validatedEmail
				}
			});

		}
		catch(error){
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: error.message,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
		}
	}
}
