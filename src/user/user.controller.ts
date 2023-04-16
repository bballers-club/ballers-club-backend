import { Controller, Delete, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { User } from './model/user.model';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAllUsers() : Promise<User[]> {
		return this.userService.findAll()
	}

	@Get(":id")
	async findOneById(@Param("id") id : string) : Promise<User> {
		return this.userService.findOneById(id)
	}

	@Post()
	async createUser( @Body() user : User) : Promise<User> {
		return this.userService.create(user)
	}

	@Put(":id")
	async updateUser( @Param("id") id : string, @Body() user : User) : Promise<User> {
		return this.userService.update(id, user)
	}

	@Delete(":id")
	async deleteUser(@Param("id") id : string) : Promise<string> {

		return this.userService.delete(id)

	}
}
