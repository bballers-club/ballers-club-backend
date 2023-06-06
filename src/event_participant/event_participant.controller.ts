import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventParticipantService } from './providers/services/event_participant.service';
import { EventParticipantRepository } from './providers/repositories/event_participant.repository';
import { ApiTags } from '@nestjs/swagger';
import { EventParticipantDto } from './dto/event_participant.dto';

@ApiTags("event-participant")
@Controller('event-participant')
export class EventParticipantController {
  constructor(private readonly eventParticipantService: EventParticipantService, private readonly eventParticipantRepository : EventParticipantRepository) {}

  @Get("find-participant-by-event/:eventId")
  async findParticipantByEventId(@Param("eventId") eventId : string) : Promise<EventParticipantDto[]> {
    return await this.eventParticipantRepository.findEventParticipant(eventId);
  }

  @Post()
  async addParticipants(@Body() participants : EventParticipantDto[]) : Promise<EventParticipantDto[]> {
    return await this.eventParticipantRepository.addParticipant(participants)
  }

  @Delete()
  async deleteParticipant(@Query("userId") participantId : string, @Query("eventId") eventId : string) : Promise<void> {
    return await this.eventParticipantRepository.deleteParticipantFromEvent({
      eventId : eventId,
      userId : participantId
    });
  }

}
