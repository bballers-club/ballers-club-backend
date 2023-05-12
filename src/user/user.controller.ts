import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Body,
	Put,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { User } from './entity/user.entity';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ResearchUserDto } from './dto/research-user-dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@SkipAuth()
	@ApiTags('user')
	@ApiResponse({
		status: 200,
		type: UserDto,
	})
	@Get()
	async findAllUsers(): Promise<User[]> {
		return this.userService.findAll();
	}

	@ApiTags('user')
	@ApiResponse({
		status: 200,
		type: UserDto,
	})
	@Get(':id')
	async findOneById(@Param('id') id: string): Promise<User> {
		return this.userService.findOneById(id);
	}

	@SkipAuth()
	@ApiTags('user')
	@ApiResponse({
		status: 201,
		type: UserDto,
	})
	@Post()
	async createUser(@Body() user: CreateUserDto): Promise<User> {
		return this.userService.create(user);
	}

	@ApiTags('user')
	@ApiResponse({
		status: 200,
		type: UserDto,
	})
	@Put(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() user: UpdateUserDto,
	): Promise<User> {
		return this.userService.update(id, user);
	}

	@ApiTags('user')
	@Delete(':id')
	async deleteUser(@Param('id') id: string): Promise<void> {
		this.userService.delete(id);
	}

	@ApiTags('user')
	@ApiParam({
		name : "researchValue",
		description : "String to check"
	})
	@Get(':researchValue')
	async findUsersByUsername(@Param('researchValue') researchValue : string) : Promise<ResearchUserDto[]> {
		return await this.userService.findUsersByName(researchValue)
	}
}
