import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateMatchParticipantDto } from './dto/create-match_participant.dto';
import { MatchParticipantRepository } from './providers/repository/match_participant.repository';
import { MatchParticipantDto } from './dto/match_participant.dto';
import { MatchParticipantService } from './providers/services/match_participant.service';

@Controller('match-participant')
export class MatchParticipantController {
  constructor(private readonly matchParticipantService: MatchParticipantService, private readonly matchParticipantRepository : MatchParticipantRepository) {}

  @Get("get-match-participant/:matchId")
  async findParticipantByMatch(@Param("matchId") matchId : string) : Promise<MatchParticipantDto[]> {
    return await this.matchParticipantRepository.findMatchParticipants(matchId);
  }

  @Post()
  async addParticipantsToMatch(@Body() match_participants : CreateMatchParticipantDto[]) : Promise<CreateMatchParticipantDto[]> {
    return await this.matchParticipantRepository.addParticipant(match_participants);
  }

  @Delete()
  async deleteParticipantFromMatch(@Query("userId") userId : string, @Query("matchId") matchId : string) : Promise<void> {
    return await this.deleteParticipantFromMatch(userId, matchId);
  }
}
