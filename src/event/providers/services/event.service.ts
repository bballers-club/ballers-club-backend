import { HttpException, Injectable } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { EventParticipantRepository } from '../../../event_participant/providers/repositories/event_participant.repository';
import { CreateEventDto } from 'src/event/dto/create_event.dto';
import { EventParticipantDto } from 'src/event_participant/dto/event_participant.dto';
import { CreateEventParticipantDto } from 'src/event_participant/dto/create-event_participant.dto';
import { EventParticipant } from 'src/event_participant/entity/event_participant.entity';
import { EventBackofficeDto } from 'src/event/dto/event_backoffice.dto';
import { MatchRepository } from 'src/match/providers/repository/match.repository';
import { z } from 'zod';

@Injectable()
export class EventService {
    constructor(
		private readonly eventRepository: EventRepository,
		private readonly eventParticipantRepository: EventParticipantRepository,
		private readonly matchRepository : MatchRepository
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

	async getEventsForBackoffice() : Promise<EventBackofficeDto[]>{
		try{
		
			const events = await this.eventRepository.getEventListForBackoffice();

			const event_backoffice : EventBackofficeDto[] = [];
			for(const event of events){
				const playground = (event.playground != null) ? `${event.playground.name}, ${event.playground.address}, ${event.playground.zipcode} ${event.playground.city}` : null;

				event_backoffice.push({
					id : event.id,
					createdAt : event.createdAt,
					organizer : event.organizer.username,
					eventName : event.eventName,
					state : event.state,
					playground : playground,
					starting_date : event.starting_date,
					ending_date : event.ending_date,
					type : event.type.name
				});	
			}

			return event_backoffice;
		}
		catch(error){
            console.log(error);
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

	async getEventAndMatchesRelatedToEvent(eventId : string) : Promise<EventBackofficeDto> {
		try{
			const validatedEventId = z.string().uuid().parse(eventId);

			const event = await this.eventRepository.getEventByIdForBackoffice(validatedEventId);
			const matches_related_to_event = await this.matchRepository.findMatchesFromEvent(validatedEventId);
			
			const playground = (event.playground != null) ? `${event.playground.name}, ${event.playground.address}, ${event.playground.zipcode} ${event.playground.city}` : null;
			
			const event_backoffice : EventBackofficeDto = {
					id : event.id,
					createdAt : event.createdAt,
					organizer : event.organizer.username,
					eventName : event.eventName,
					state : event.state,
					playground : playground,
					starting_date : event.starting_date,
					ending_date : event.ending_date,
					type : event.type.name,
					matches : matches_related_to_event
			};

			return event_backoffice
		}
		catch(error){
            console.log(error);
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
