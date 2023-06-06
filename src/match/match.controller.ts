import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchRepository } from './providers/repository/match.repository';
import { MatchDto } from './dto/match.dto';
import { CreateMatchDto } from './dto/create_match.dto';
import { UpdateMatchDto } from './dto/update_match.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("match")
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService, private readonly matchRepository : MatchRepository) {

  }

  @Get()
  async findAllMatches() : Promise<MatchDto[]> {
    return await this.matchRepository.findAll()
  }

  @Get(":matchId")
  async findMatchById(@Param("matchId") matchId : string) : Promise<MatchDto> {
    return await this.findMatchById(matchId)
  }

  @Get("/event-matches/:eventId")
  async findMatchByEventId(@Param("eventId") eventId : string) : Promise<MatchDto[]> {
    return await this.matchRepository.findMatchesFromEvent(eventId)
  }

  @Post()
  async createMatch(@Body() match : CreateMatchDto) : Promise<MatchDto> {
    return await this.matchRepository.createMatch(match)
  }

  @Put()
  async updateMatch(@Body() match : UpdateMatchDto) : Promise<MatchDto> {
    return await this.matchRepository.updateMatch(match)
  }
}
