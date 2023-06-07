import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { MATCH_PARTICIPANT_REPOSITORY } from "../match_participant.constants";
import { z } from "zod"
import { Repository } from "typeorm";
import { MatchParticipant } from "src/match_participant/entities/match_participant.entity";

@Injectable()
export class MatchParticipantRepository {
    constructor(
		@Inject(MATCH_PARTICIPANT_REPOSITORY)
		private matchParticipantRepository: Repository<MatchParticipant>,
	) {}

    private matchParticipantObjectValidator = z.object({
        matchId : z.string().uuid(),
        userId : z.string().uuid()
    });

    async findMatchParticipants(matchId : string) : Promise<MatchParticipant[]> {
        try{
            const validatedMatchId = z.string().uuid().parse(matchId)
            
            return await this.matchParticipantRepository.find({
                where : {
                    matchId : validatedMatchId
                },
                relations : {
                    user : true
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
    
    async addParticipant(match_participants : {
        matchId : string,
        userId : string
    }[]) : Promise<MatchParticipant[]> {
        try{
            const validatedParticipants = match_participants.map((match_participant) => {
                const validatedMatchParticipants = this.matchParticipantObjectValidator.parse(match_participant);

                return this.matchParticipantRepository.create(validatedMatchParticipants);
            })

            return await this.matchParticipantRepository.save(validatedParticipants);
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

    async deleteParticipantFromMatch(match_participant : {
        matchId : string,
        userId : string
    }) : Promise<void> {
        try {
            const validatedMatchParticipant = this.matchParticipantObjectValidator.parse(match_participant);
            await this.matchParticipantRepository.delete({
                matchId : validatedMatchParticipant.matchId,
                userId : validatedMatchParticipant.userId
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

}