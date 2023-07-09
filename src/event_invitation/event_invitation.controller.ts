import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventInvitationService } from './providers/services/event_invitation.service';
import { CreateEventInvitationDto } from './dto/create-event_invitation.dto';
import { EventInvitationDto } from './dto/event_invitation.dto';
import { EventInvitationRepository } from './providers/repositories/event_invitation.repository';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event-invitation')
@Controller('event-invitation')
export class EventInvitationController {
  constructor(private readonly eventInvitationService: EventInvitationService, private readonly eventInvitationRepository : EventInvitationRepository) {}

  @Get('user/:id')
  async getUserInvitations(@Param('id') id : string) : Promise<EventInvitationDto[]>{
    return await this.eventInvitationRepository.getUserInvitations(id)
  }

  @Post()
  async sendInvitation(@Body() createEventInvitationDto: CreateEventInvitationDto) {
    return await this.eventInvitationRepository.sendInvitation(createEventInvitationDto);
  }

  @Post("accept-invitation")
  async acceptInvitation(@Body() acceptInvitation : EventInvitationDto) {
    return await this.eventInvitationService.acceptInvitation(acceptInvitation)
  }

  @Delete(':id')
  async denyInvitation(@Param('id') id: string) {
    return await this.eventInvitationRepository.deleteInvitation(id);
  }
}
