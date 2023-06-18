import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";
import { Repository } from 'typeorm';
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
        eventName : z.string(),
    })

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
        eventName : string,
        starting_date ?: Date,
        ending_date ?: Date
    }) : Promise<Event> {
        try {
            

            const validatedEvent = this.eventObjectValidator.omit({id : true}).parse(event);

            const createdEvent = await this.eventRepository.create({
                ...validatedEvent
            });

            return await this.eventRepository.save(createdEvent)
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

    async updateEvent(event : {
        id : string
        organizerId ?: string,
        eventName ?: string,
        starting_date ?: Date,
        ending_date ?: Date
    }) : Promise<Event> {
        try {
            const validatedEvent = this.eventObjectValidator.partial().parse(event);

            await this.eventRepository.update(validatedEvent.id, validatedEvent);

            return await this.findEventById(validatedEvent.id);
             
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
}