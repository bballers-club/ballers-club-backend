import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";
import { ILike, Repository } from 'typeorm';
import { EVENT_REPOSITORY } from "../event.constants";
import { z } from "zod";
import { Event } from "src/event/entity/event.entity";

@Injectable()
export class EventRepository {
    constructor(
		@Inject(EVENT_REPOSITORY)
		private eventRepository: Repository<Event>,
	) {}

    private eventObjectValidator = z.object({
        id : z.string().uuid(),
        organizerId : z.string().uuid(),
        state : z.number(),
        eventName : z.string(),
        playgroundId : z.string().optional(),
        starting_date : z.string().optional(),
        ending_date : z.string().optional(),
        eventTime : z.string().optional()
    });

    async findAll() : Promise<Event[]> {
        try{
            return await this.eventRepository.find();
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

    async findEventById(id : string) : Promise<Event> {
        try {
            const validatedId  = z.string().uuid().parse(id);

            return await this.eventRepository.findOne({
                where : {
                    id : validatedId
                },
                relations : {
                    playground : true
                }
            })
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

    async createEvent(event : {
        organizerId : string,
        state : number,
        eventName : string,
        playgroundId ?: string,
        starting_date ?: Date,
        ending_date ?: Date,
        eventTime ?: Date
    }) : Promise<Event> {
        try {
            

            const validatedEvent = this.eventObjectValidator.omit({id : true}).parse(event);
        
            const createdEvent = await this.eventRepository.create({
                ...validatedEvent
            });

            return await this.eventRepository.save(createdEvent)
        }
        catch(error){
            console.log(error)
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: error.message,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error.message,
				},
			);
        }

    }

    async updateEvent(event : {
        id : string
        organizerId ?: string,
        playgroundId ?: string,
        eventName ?: string,
        state ?: number,
        starting_date ?: Date,
        ending_date ?: Date,
        eventTime ?: Date
    }) : Promise<Event> {
        try {
            
            await this.eventRepository.update(event.id, event);

            return await this.findEventById(event.id);
             
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

    async deleteEvent(id : string) : Promise<void>{
        try {
            const validatedId = z.string().uuid().parse(id);

            await this.eventRepository.delete(validatedId)
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

    async getEventState(id : string) : Promise<Event> {
        try{
            const validatedId = z.string().uuid().parse(id);
            const state = await this.eventRepository.createQueryBuilder("event")
            .addSelect("event.state")
            .where("event.id = :id", {id : validatedId})
            .getOne();

            return state;
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

    async getEventListForAUser(id : string) : Promise<Event[]> {
        try{
            const validatedId = z.string().uuid().parse(id);
            const queried_data = this.eventRepository
            .query(`select distinct
                event."eventName",
                event.starting_date,
                playground.address,
                playground.city,
                event_type.name
            from
                event
            LEFT JOIN playground on playground.id = event."playgroundId"
            LEFT JOIN event_type on event_type.id = event."typeId"  
            LEFT JOIN event_participant on event_participant."eventId" = event.id
            WHERE event."organizerId" = '${validatedId}' OR "event_participant"."userId" = '${validatedId}';
          `);

            return queried_data;
        }
        catch(error){
            console.log(error);
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

    async getEventListForBackoffice(researchValue : string = "") : Promise<Event[]> {
        try{
            if(researchValue.length > 1)
            {

                return await this.eventRepository.find({
                    where:[
                        {
                            eventName : ILike(`%${researchValue}%`)
                        }
                    ],
                    relations:{
                        organizer: true,
                        playground: true,
                        type:true
                    }
                })

            }else{
                return await this.eventRepository.find({
                    relations:{
                        organizer: true,
                        playground: true,
                        type:true
                    }
                })
            }
        }
        catch(error){
            console.log(error);
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
    
    async getEventByIdForBackoffice(id : string) : Promise<Event> {
        try{
            const validated_id = z.string().uuid().parse(id);

            return await this.eventRepository.findOne({
                where:{
                    id:validated_id
                },
                relationLoadStrategy:"join",
                relations:{
                    organizer:true,
                    playground:true,
                    type:true
                }
            })
        }
        catch(error){
            console.log(error);
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