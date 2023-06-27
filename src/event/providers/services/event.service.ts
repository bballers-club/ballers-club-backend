import { HttpException, Injectable } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { EventParticipantRepository } from '../../../event_participant/providers/repositories/event_participant.repository';
import { CreateEventDto } from 'src/event/dto/create_event.dto';
import { EventParticipantDto } from 'src/event_participant/dto/event_participant.dto';
import { CreateEventParticipantDto } from 'src/event_participant/dto/create-event_participant.dto';
import { EventParticipant } from 'src/event_participant/entity/event_participant.entity';

@Injectable()
export class EventService {
    constructor(
		private readonly eventRepository: EventRepository,
		private readonly eventParticipantRepository: EventParticipantRepository
	) {}

	async createEventAndAddParticipant(event : CreateEventDto, eventParticipant : string[]) : Promise<{id : string}> {
		try{    
			
			//First create the event
			const createdEvent = await this.eventRepository.createEvent(event);
			const eventParticipantToAdd : EventParticipant[] = [];

			for(const participant of eventParticipant){
				eventParticipantToAdd.push(await this.eventParticipantRepository.createParticipantObject({
					"eventId" : createdEvent.id,
					"userId" : participant
				}))
			}

			//Add participants
			await this.eventParticipantRepository.addParticipant(await eventParticipantToAdd);

			return {
				id : createdEvent.id
			};
            
        }
        catch(error){
            throw new HttpException(
				{
					status: error.status,
					error: error.message,
				},
				error.status,
				{
					cause: error,
				},
			);
        }
	}
}
