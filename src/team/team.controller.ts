import { CreateTeamDto } from './dto/create-team.dto';
import { PlayerInTeamDto } from './dto/player-in-team.dto';
import { TeamDto } from './dto/team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entity/team.entity';
import { TeamService } from './providers/team.service';
import { Controller, Delete, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @ApiTags("team")
    @ApiResponse({
        status : 200,
        type : TeamDto
    })
    @Get()
    async findAllTeams() : Promise<Team[]> {
        return this.teamService.findAll()
    }

    @ApiResponse({
        status : 200,
        type : TeamDto
    })
    @ApiTags("team")
    @Get(":id")
    async findOneTeamById(@Param("id") id : string): Promise<TeamDto> {
        return this.teamService.findOneById(id)
    }

    @ApiResponse({
        status : 201,
        type : TeamDto
    })
    @ApiTags("team")
    @Post()
    async createTeam(@Body() team : CreateTeamDto) : Promise<Team> {
        return this.teamService.create(team)
    }

    @ApiResponse({
        status : 200,
        type : TeamDto
    })
    @ApiTags("team")
    @Put(":id")
    async updateTeam(@Param("id") id : string ,@Body() user : UpdateTeamDto) : Promise<Team> {
        return this.teamService.update(id, user)
    }

    @ApiTags("team")
    @Delete(":id")
    async deleteTeam(@Param("id") id : string) : Promise<void> {
        return this.teamService.delete(id)
    }

    @ApiTags("team")
    @ApiBody({
        type : PlayerInTeamDto,
        schema : {
            example : {
                teamId : "be0e7699-38a3-407b-b81f-7a32dd271423",
                playerId : "7f56b73b-7220-4ed4-bb2f-09003617d07d"
            }
        }
    })
    @Post("add-player-into-team")
    async addPlayerIntoTeam(@Body("parameters") parameters : PlayerInTeamDto) : Promise<void> {
       
        return this.teamService.addPlayerIntoATeam(parameters)
    }

    @ApiTags("team")
    @ApiBody({
        type : PlayerInTeamDto,
        schema : {
            example : {
                teamId : "be0e7699-38a3-407b-b81f-7a32dd271423",
                playerId : "7f56b73b-7220-4ed4-bb2f-09003617d07d"
            }
        }
    })
    @Delete("delete-player-in-team")
    async deletePlayerInTeam(@Body("teamId") teamId : string, @Body("playerId") playerId : string ) : Promise<void> {
        return this.teamService.deleteUserFromATeam(teamId,playerId)
    }

}
