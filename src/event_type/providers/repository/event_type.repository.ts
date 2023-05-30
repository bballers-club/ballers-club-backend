import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { EVENT_TYPE_REPOSITORY } from "../event_type.constants";
import { EventType } from "src/event_type/entity/event_type.entity";
import { z } from "zod"
import { Repository } from "typeorm";

@Injectable()
export class EventTypeRepository {
    constructor(
		@Inject(EVENT_TYPE_REPOSITORY)
		private eventTypeRepository: Repository<EventType>,
	) {}

    private eventTypeObjectValidator = z.object({
        id : z.string().uuid(),
        name : z.string()
    })

    async findAll() : Promise<EventType[]> {
        try{
            return await this.eventTypeRepository.find();
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

    async createEventType(eventType : {
        name : string
    }) : Promise<EventType> {
        try{
            const validatedEventType = this.eventTypeObjectValidator.omit({id : true}).parse(eventType)
            const createdEventType   = await this.eventTypeRepository.create({...validatedEventType});

            return await this.eventTypeRepository.save(createdEventType);
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