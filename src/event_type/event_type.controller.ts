import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventTypeService } from './providers/services/event_type.service';
import { EventTypeRepository } from './providers/repository/event_type.repository';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventTypeDto } from './dto/event_type.dto';
import { CreateEventTypeDto } from './dto/create_event_type.dto';

@ApiTags('event-type')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService, private readonly eventTypeRepository: EventTypeRepository) {}

  @ApiResponse({
    status : 200,
    type : EventTypeDto
  })
  @Get()
  async findAllEventType() : Promise<EventTypeDto[]> {
    return await this.eventTypeRepository.findAll()
  }

  @ApiResponse({
    status : 201,
    type : EventTypeDto
  })
  @Post()
  async createEventType(@Body() eventType : CreateEventTypeDto ) : Promise<EventTypeDto>{
    return await this.eventTypeRepository.createEventType(eventType)
  }
}
