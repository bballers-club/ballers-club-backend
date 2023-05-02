import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
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
  async findAll() {
    return await this.playgroundRequestService.findAll();
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
}
