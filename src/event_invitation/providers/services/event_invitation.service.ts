import { HttpException, HttpStatus, Injectable, Delete } from '@nestjs/common';
import { EventInvitationDto } from 'src/event_invitation/dto/event_invitation.dto';
import { EventParticipant } from 'src/event_participant/entity/event_participant.entity';
import { EventInvitationRepository } from '../repositories/event_invitation.repository';
import { EventParticipantRepository } from 'src/event_participant/providers/repositories/event_participant.repository';
import { z } from 'zod';

@Injectable()
export class EventInvitationService {
  constructor(private readonly eventInvitationRepository : EventInvitationRepository, private readonly eventParticipantRepository : EventParticipantRepository) {}

  async acceptInvitation(eventInvitation: EventInvitationDto) : Promise<EventParticipant> {
    try{
        //First we delete the invitation
        await this.eventInvitationRepository.deleteInvitation(eventInvitation.id);

        //Add the user to the event particpant
        const createdEventParticipant = await this.eventParticipantRepository.addParticipant([
          {
            eventId : z.string().uuid().parse(eventInvitation.eventId),
            userId : z.string().uuid().parse(eventInvitation.invitedUserId)
          }
        ]);

        return await this.eventParticipantRepository.createParticipantObject({
          eventId : eventInvitation.eventId,
          userId : eventInvitation.invitedUserId
        });
    }
    catch(error){
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
    }
  }
}
