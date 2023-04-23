import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PlaygroundsService } from './providers/playgrounds.service';
import { Playground } from './entity/playground.entity';
import { Coordinates } from 'src/interfaces/coordinates.interface';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';

@Controller('playgrounds')
export class PlaygroundsController {
	constructor(private readonly playgroundsService: PlaygroundsService) {}

	@SkipAuth()
	@Get() 
	async findAllPlaygrounds() : Promise<Playground[]> {
		return this.playgroundsService.findAll();
	}

	@Get(":id")
	async findPlaygroundById(@Param("id") id : string) : Promise<Playground>{
		return this.playgroundsService.findOneById(id)
	}

	@Get("playground-in-radius/:radius")
	async findPlaygroundInRadius(@Param("radius") radius : number, @Body() userCoordinates : Coordinates){
		return this.playgroundsService.findPlaygroundsAroundPlayer(userCoordinates.latitude, userCoordinates.longitude, radius)
	}

	@Post()
	async createPlayground(@Body() playground : CreatePlaygroundDto) : Promise<Playground> {
		return this.playgroundsService.create(playground)
	}

	@Put(":id")
	async updatePlayground(@Param("id") id : string, @Body() playgroundUpdate : UpdatePlaygroundDto) : Promise<Playground>{
		return this.playgroundsService.update(id, playgroundUpdate)
	}

	@Delete(":id")
	async deletePlayground(@Param("id") id : string) : Promise<void> {
		return this.playgroundsService.delete(id)
	}

}
