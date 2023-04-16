import { Team } from './model/team.model';
import { TeamService } from './providers/team.service';
import { Controller, Delete, Get, Param, Post, Body, Put } from '@nestjs/common';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Get()
    async findAllTeams() : Promise<Team[]> {
        return this.teamService.findAll()
    }

    @Get(":id")
    async findOneTeamById(@Param("id") id : string): Promise<Team> {
        return this.teamService.findOneById(id)
    }

    @Post()
    async createTeam(@Body() team : Team) : Promise<Team> {
        return this.teamService.create(team)
    }

    @Put(":id")
    async updateTeam(@Param("id") id : string ,@Body() user : Team) : Promise<Team> {
        return this.teamService.update(id, user)
    }

    @Delete(":id")
    async deleteTeam(@Param("id") id : string) : Promise<void> {
        return this.teamService.delete(id)
    }

    @Post("add-player-into-team")
    async addPlayerIntoTeam(@Body("teamId") teamId : string, @Body("playerId") playerId : string) : Promise<void> {
       
        return this.teamService.addPlayerIntoATeam(teamId,playerId)
    }

    @Post("delete-player-in-team")
    async deletePlayerInTeam(@Body("teamId") teamId : string, @Body("playerId") playerId : string ) : Promise<void> {
        return this.teamService.deleteUserFromATeam(teamId,playerId)
    }

}
