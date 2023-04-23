import { Controller, Delete, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { User } from './entity/user.entity';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
	@Post()
	async createUser( @Body() user : CreateUserDto) : Promise<User> {
		return this.userService.create(user)
	}

	@Put(":id")
	async updateUser( @Param("id") id : string, @Body() user : UpdateUserDto) : Promise<User> {
		return this.userService.update(id, user)
	}

	@Delete(":id")
	async deleteUser(@Param("id") id : string) : Promise<void> {
		this.userService.delete(id)
	}
}
