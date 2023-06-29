import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Body,
	Put,
	HttpException,
	HttpStatus,
	Header,
	Headers,
	Patch,
	Query,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { User } from './entity/user.entity';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ResearchUserDto } from './dto/research-user-dto';
import { supabaseClient } from 'src/main';
import { number } from 'zod';
import { UpdateUserBackofficeDto } from './dto/update_user_backoffice.dto';
import { UserBackofficeDto } from './dto/user_backoffice.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@SkipAuth()
	@ApiResponse({
		status: 200,
		type: UserDto,
	})
	@Get()
	async findAllUsers(): Promise<User[]> {
		return this.userService.findAll();
	}

	@ApiResponse({
		status: 200,
		type: UserDto,
	})
	@Get(':id')
	async findOneById(@Param('id') id: string): Promise<User> {
		return this.userService.findOneById(id);
	}

	@SkipAuth()
	@ApiResponse({
		status: 201,
		type: UserDto,
	})
	@Post()
	async createUser(@Body() user: CreateUserDto): Promise<User> {
		return this.userService.create(user);
	}

	@ApiResponse({
		status: 200,
		type: UserDto,
	})
	@Put()
	async updateUser(
		@Body() user: UpdateUserDto,
	): Promise<User> {
		return this.userService.update(user.id, user);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string): Promise<void> {
		this.userService.delete(id);
	}

	@ApiParam({
		name: 'researchValue',
		description: 'String to check',
	})
	@Get('by-username/:researchValue')
	async findUsersByUsername(
		@Param('researchValue') researchValue: string,
	): Promise<ResearchUserDto[]> {
		return await this.userService.findUsersByName(researchValue);
	}

	@SkipAuth()
	@Post("from-api")
	async createUserFromApi(
	@Body("email") email : string, 
	@Body("password") password : string, 
	@Body("level") level : string, 
	@Body("username") username : string, 
	@Body("position") position : string) : Promise<CreateUserDto> {
		return await this.userService.createUserFromApi(email,password,username,level,position);
	}

	@Get("backoffice/users")
	async getUsersListBackoffice(@Query('researchValue') researchValue : string = "") {
		return await this.userService.usersForBackOffice(researchValue);
	}

	@Post("backoffice/ban/:userId")
	async banUser(@Param("userId") id : string, @Body("duration") duration : number, @Headers() headers : Record<string,string>) : Promise<string> {
		
		return this.userService.banUser(id, duration,headers.authorization);
	
	}

	@Post("backoffice/unban/:userId")
	async unbanUser(@Param("userId") id : string, @Headers() headers : Record<string,string>) : Promise<string> {
		
		return this.userService.unbanUser(id, headers.authorization)
	}

	@Post("backoffice/user")
	async updateUserFromBackoffice(@Body() updateUser : UpdateUserBackofficeDto) : Promise<UserBackofficeDto[]> {
		return this.userService.updateForBackoffice(updateUser.id,updateUser);
	}
}
