import { EventService } from './providers/services/event.service';
import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EventDto } from './dto/event.dto';
import { EventRepository } from './providers/repository/event.repository';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create_event.dto';
import { UpdateEventDto } from './dto/update_event.dto';
import { string } from 'zod';
import { CreateEventParticipantDto } from 'src/event_participant/dto/create-event_participant.dto';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService, private readonly eventRepository : EventRepository) {}

  @ApiResponse({
		status: 200,
		type: [EventDto],
	})
	@Get()
	async findAllEvents(): Promise<Event[]> {
		return await this.eventRepository.findAll();
	}

  @ApiResponse({
		status: 200,
		type: EventDto,
	})
  @Get(":id")
  async findEventById(@Param("id") eventId : string): Promise<Event> {
    return await this.eventRepository.findEventById(eventId)
  }

  @Post()
  async createEvent(@Body() event : CreateEventDto): Promise<Event> {
    return await this.eventRepository.createEvent(event)
  }

  @Put()
  async updateEvent(@Body() event : UpdateEventDto): Promise<Event> {
    return await this.eventRepository.updateEvent(event)
  }

  @Get("/state/:id")
  async getEventState(@Param('id') id : string): Promise<Event> {
    return await this.eventRepository.getEventState(id);
  }

  @ApiResponse({
    status : 201,
    type: class ReturnId { id : string}
  })
  @Post("/create-and-add-participant")
  async createEventAndAddParticipant(@Body('event') event : CreateEventDto, @Body('participants') participants : string[]) : Promise<{id : string}> {
    console.log(event,participants)
    return await this.eventService.createEventAndAddParticipant(event, participants);
  }

  @Get("user-event/:userId")
  async getUserEventList(@Param('userId') userId : string) : Promise<Event[]> {
    return await this.eventRepository.getEventListForAUser(userId);
  }
}
