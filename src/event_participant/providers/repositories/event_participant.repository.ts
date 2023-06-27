import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { EVENT_PARTICIPANT_REPOSITORY } from "../event_participant.constants";
import { z } from "zod";
import { EventParticipant } from "src/event_participant/entity/event_participant.entity";

@Injectable()
export class EventParticipantRepository {
    constructor(
		@Inject(EVENT_PARTICIPANT_REPOSITORY)
		private eventParticipantRepository: Repository<EventParticipant>,
	) {}

    private eventParticipantObjectValidator = z.object({
        eventId : z.string().uuid(),
        userId : z.string().uuid()
    })

    async findEventParticipant(eventId : string) : Promise<EventParticipant[]> {
        try{
            const validatedEventId = z.string().uuid().parse(eventId)

            return await this.eventParticipantRepository.find({
                where : {
                    eventId : validatedEventId
                },
                relations : {
                    user : true
                }
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

    async addParticipant(eventParticipants : {
        eventId : string,
        userId : string
    }[]) : Promise<EventParticipant[]> {
        try{
            const validatedParticipants = eventParticipants.map((event_participant) => {
                const validatedParticipant = this.eventParticipantObjectValidator.parse(event_participant)

                return this.eventParticipantRepository.create(validatedParticipant);
            })

            return await this.eventParticipantRepository.save(validatedParticipants)
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

    async deleteParticipantFromEvent(eventParticipant : {
        eventId : string,
        userId : string
    }) : Promise<void> {
        try{
            const validatedParticipant = this.eventParticipantObjectValidator.parse(eventParticipant);

            await this.eventParticipantRepository.delete({
                eventId : validatedParticipant.eventId,
                userId : validatedParticipant.userId
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

    async createParticipantObject(eventParticipant : { eventId : string, userId : string}) : Promise<EventParticipant> {
        try{
            
            return await this.eventParticipantRepository.create({
                ...eventParticipant
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