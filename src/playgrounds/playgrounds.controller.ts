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
import { Coordinates } from 'src/interfaces/coordinates.interface';
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
  async findAllPlaygrounds(): Promise<Playground[]> {
    return this.playgroundsService.findAll();
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
  @ApiBody({
    schema: {
      example: {
        latitude: 48.009819,
        longitude: 45.8766,
      },
    },
  })
  @Get('playground-in-radius/:radius')
  async findPlaygroundInRadius(
    @Param('radius') radius: number,
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ) {
    return this.playgroundsService.findPlaygroundsAroundPlayer(
      Number(latitude),
      Number(longitude),
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
