import { HttpException, Injectable } from '@nestjs/common';
import { MatchRepository } from '../repository/match.repository';
import { MatchParticipantRepository } from '../../../match_participant/providers/repository/match_participant.repository';
import { CreateMatchDto } from 'src/match/dto/create_match.dto';
import { CreateMatchParticipantDto } from 'src/match_participant/dto/create-match_participant.dto';
import { MatchDto } from 'src/match/dto/match.dto';
import { MatchParticipantDto } from 'src/match_participant/dto/match_participant.dto';
import { MatchParticipant } from 'src/match_participant/entities/match_participant.entity';

@Injectable()
export class MatchService {
    constructor(
		private readonly matchRepository: MatchRepository,
		private readonly matchParticipantRepository: MatchParticipantRepository
	) {}

    async createMatchAndAddParticipants(match : CreateMatchDto, participants : {userId : string, inTeamOne : boolean, inTeamTwo : boolean}[]) : Promise<{
        match : MatchDto,
        participants : MatchParticipantDto[]
    }>{
        try{    
        
			const createdMatch = await this.matchRepository.createMatch(match);
            const match_participant_to_add : MatchParticipant[] = [];

            for(const participant of participants){
                match_participant_to_add.push(await this.matchParticipantRepository.createMatchParticipantObject({
                    matchId : createdMatch.id,
                    userId : participant.userId,
                    inTeamOne : participant.inTeamOne,
                    inTeamTwo : participant.inTeamTwo
                }));
            }

            const added_participants = await this.matchParticipantRepository.addParticipant(match_participant_to_add);

            return {
                match : createdMatch,
                participants : added_participants
            };
            
        }
        catch(error){
           
            throw new HttpException(
				{
					status: error.status,
					error: error.cause.response,
				},
				error.status,
				{
					cause: error,
				},
			);
        }
    }
}
