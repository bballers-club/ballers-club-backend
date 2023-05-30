import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
	Query,
} from '@nestjs/common';
import { PlaygroundsService } from './providers/playgrounds.service';
import { Playground } from './entity/playground.entity';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { number } from 'zod';
import { PlaygroundDto } from './dto/playground.dto';

@Controller('playgrounds')
export class PlaygroundsController {
	constructor(private readonly playgroundsService: PlaygroundsService) {}

	@ApiTags('playgrounds')
	@ApiResponse({
		status: 200,
		type: PlaygroundDto,
	})
	@SkipAuth()
	@Get()
	async findAllPlaygrounds(@Query('query') query: string, @Query('page') page: number,@Query('size') size: number): Promise<Playground[]> {
		let parsedPage = 1;
		let parsedSize = 10;
		if (page) {
			parsedPage = Number(page);
		}
		if (size) {
			parsedSize = Number(size);
		}
		return this.playgroundsService.findAll(
			query,
			parsedPage,
			parsedSize,
		);
	}

	@ApiTags('playgrounds')
	@ApiResponse({
		status: 200,
		type: PlaygroundDto,
	})
	@Get(':id')
	async findPlaygroundById(@Param('id') id: string): Promise<Playground> {
		return this.playgroundsService.findOneById(id);
	}

	@ApiTags('playgrounds')
	@ApiResponse({
		status: 200,
		type: Playground,
	})
	@ApiParam({
		name: 'radius',
		type: number,
	})
	@Get('playground-in-radius/:radius')
	async findPlaygroundInRadius(
		@Param('radius') radius: number,
		@Query('latitude') latitude: string,
		@Query('longitude') longitude: string,
	) {
		return this.playgroundsService.findPlaygroundsAroundPlayer(
			Number.parseFloat(latitude),
			Number.parseFloat(longitude),
			Number(radius),
		);
	}

	@ApiResponse({
		status: 200,
		type: Playground,
	})
	@ApiTags('playgrounds')
	@Post()
	async createPlayground(
		@Body() playground: CreatePlaygroundDto,
	): Promise<Playground> {
		return this.playgroundsService.create(playground);
	}

	@ApiResponse({
		status: 200,
		type: Playground,
	})
	@ApiTags('playgrounds')
	@Put(':id')
	async updatePlayground(
		@Param('id') id: string,
		@Body() playgroundUpdate: UpdatePlaygroundDto,
	): Promise<Playground> {
		return this.playgroundsService.update(id, playgroundUpdate);
	}

	@ApiTags('playgrounds')
	@Delete(':id')
	async deletePlayground(@Param('id') id: string): Promise<void> {
		return this.playgroundsService.delete(id);
	}
}
