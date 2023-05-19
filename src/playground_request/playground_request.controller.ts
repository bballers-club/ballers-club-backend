import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { PlaygroundRequestService } from './providers/playground_request.service';
import { CreatePlaygroundRequestDto } from './dto/create-playground_request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaygroundRequest } from './entity/playground_request.entity';

@Controller('playground-request')
export class PlaygroundRequestController {
	constructor(
		private readonly playgroundRequestService: PlaygroundRequestService,
	) {}

	@ApiTags('playground-request')
	@ApiResponse({
		status: 201,
		type: PlaygroundRequest,
	})
	@Post()
	async requestPlayground(
		@Body() createPlaygroundRequestDto: CreatePlaygroundRequestDto,
	) {
		return await this.playgroundRequestService.requestPlaygroundCreation(
			createPlaygroundRequestDto,
		);
	}

	@ApiTags('playground-request')
	@ApiResponse({
		status: 200,
		type: PlaygroundRequest,
	})
	@Get()
	async findAll(@Query('query') query: string, @Query('page') page: number,@Query('size') size: number) {
		let parsedPage = 1;
		let parsedSize = 10;
		if (page) {
			parsedPage = Number(page);
		}
		if (size) {
			parsedSize = Number(size);
		}
		return await this.playgroundRequestService.findAll(
			query,
			parsedPage,
			parsedSize,
		);
	}

	@ApiTags('playground-request')
	@ApiResponse({
		status: 200,
		type: PlaygroundRequest,
	})
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.playgroundRequestService.findOne(id);
	}

	@ApiTags('playground-request')
	@Delete(':id')
	async cancelRequest(@Param('id') id: string) {
		return await this.playgroundRequestService.remove(+id);
	}

	@ApiTags('playground-request')
	@Get('playground-in-radius/:radius')
	async findPlaygroundInRadius(
		@Param('radius') radius: number,
		@Query('latitude') latitude: string,
		@Query('longitude') longitude: string,
		@Query('query') query: string, 
		@Query('page') page: number,
		@Query('size') size: number
	) {
		return await this.playgroundRequestService.findPlaygroundRequestsAroundPlayer(
			Number(radius),
			Number(latitude),
			Number(longitude),
		);
	}
}
