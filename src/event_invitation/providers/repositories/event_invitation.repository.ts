import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EVENT_INVITATION_REPOSITORY } from "../event_invitation.constants";
import { Repository } from "typeorm";
import { CreateEventInvitationDto } from "src/event_invitation/dto/create-event_invitation.dto";
import { EventInvitation } from "src/event_invitation/entity/event_invitation.entity";
import { z } from "zod";

@Injectable()
export class EventInvitationRepository {
    constructor(
		@Inject(EVENT_INVITATION_REPOSITORY)
		private eventInvitationRepository: Repository<EventInvitation>,
	) {}


    async sendInvitation(eventInvitation : CreateEventInvitationDto) : Promise<EventInvitation> {
        try{
            const createdInvitation = await this.eventInvitationRepository.create({...eventInvitation})

            return await this.eventInvitationRepository.save(createdInvitation);
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

    async deleteInvitation(id : string) : Promise<{id : string}> {
        try{
           const validatedId = z.string().uuid().parse(id);

           await this.eventInvitationRepository.delete(validatedId);

           return {
                id : validatedId
           }
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

    async getUserInvitations(id : string) : Promise<EventInvitation[]> {
        try{
            return await this.eventInvitationRepository.find({
                where : {
                    invitedUserId : z.string().uuid().parse(id)
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

}