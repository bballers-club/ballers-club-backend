import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PlaygroundRequestService } from './providers/playground_request.service';
import { CreatePlaygroundRequestDto } from './dto/create-playground_request.dto';
import { UpdatePlaygroundRequestDto } from './dto/update-playground_request.dto';

@Controller('playground-request')
export class PlaygroundRequestController {
  constructor(private readonly playgroundRequestService: PlaygroundRequestService) {}

  @Post()
  async requestPlayground(@Body() createPlaygroundRequestDto: CreatePlaygroundRequestDto) {
	return await this.playgroundRequestService.requestPlaygroundCreation(createPlaygroundRequestDto);
  }

  @Get()
  async findAll() {
	return await this.playgroundRequestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
	return await this.playgroundRequestService.findOne(id);
  }

  @Delete(':id')
  async cancelRequest(@Param('id') id: string) {
	return await this.playgroundRequestService.remove(+id);
  }
}
