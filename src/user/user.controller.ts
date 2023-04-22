import { Controller, Delete, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { User } from './model/user.model';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}


	@SkipAuth()
	@Get()
	async findAllUsers() : Promise<User[]> {
		return this.userService.findAll()
	}

	@Get(":id")
	async findOneById(@Param("id") id : string) : Promise<User> {
		return this.userService.findOneById(id)
	}

	@SkipAuth()
	@HttpCode(201)
	@Post()
	async createUser( @Body() user : User) : Promise<User> {
		return this.userService.create(user)
	}

	@Put(":id")
	async updateUser( @Param("id") id : string, @Body() user : User) : Promise<User> {
		return this.userService.update(id, user)
	}

	@Delete(":id")
	async deleteUser(@Param("id") id : string) : Promise<void> {

		this.userService.delete(id)

	}
}
