import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Team } from "../model/team.model"
import { z } from "zod";
import { Repository } from 'typeorm';
import { CRUDFunctions } from '../../interfaces/repository.interface';
import { User } from 'src/user/model/user.model';

@Injectable()
export class TeamService implements CRUDFunctions<Team>{
    constructor(
		@Inject('TEAM_REPOSITORY')
		private teamRepository: Repository<Team>,
	) {}

    private teamObjectValidator = z.object({
        id : z.string().uuid(),
        name : z.string(),
        players : z.object({
            id : z.string()
        }).array()
    })

    async findAll(): Promise<Team[]> {
        try{
            return this.teamRepository.find();
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }

    async findOneById(id: string): Promise<Team> {
        try{
            const validatedId = z.string().uuid().parse(id);

            return await this.teamRepository.findOne({
                where : {
                    id : validatedId
                },
                relations : {
                    players : true
                }
            });
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }

    async create(team : Team): Promise<Team> {
        try{
            const teamValidatorWithoutId = this.teamObjectValidator.omit({id : true}).parse(team)

            const createdTeam = await this.teamRepository.create({
                ...teamValidatorWithoutId
            });

            return this.teamRepository.save(createdTeam)
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }

    async update(id: string, team: Team): Promise<Team> {
        try{
            const validatedId = z.string().uuid().parse(id)
            const teamValidatorWithoutId = this.teamObjectValidator.omit({id : true}).parse(team)

            await this.teamRepository.update(validatedId, {
                ...teamValidatorWithoutId
            });

            return await this.findOneById(validatedId);
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }

    async delete(id: string): Promise<void> {
        try{
            const teamInformations = await this.findOneById(id);
            
            if(this.teamObjectValidator.safeParse(teamInformations).success)
            {
                const validatedPlayersNumber = z.object({
                    id : z.string().uuid()
                }).array().max(1).safeParse(teamInformations.players)

        
                if(!validatedPlayersNumber.success)
                {
                    throw new Error("Cannot delete a team if there's more than 1 member left")
                }

            }

            await this.teamRepository.delete(id);
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
				}
			);
        }
    }

    async addPlayerIntoATeam(teamId : string, playerId : string) : Promise<void>{
        try{
            const validatedTeamId       = z.string().uuid().parse(teamId)
            const validatedPlayerId     = z.string().uuid().parse(playerId) 

            const teamInfo    = (await this.teamRepository.findOne(
                {
                    where : {
                        id : validatedTeamId
                    },
                    relations : {
                        players : true
                    }
                }
            ));
        
            const playerIsContained = teamInfo.players.find(player => player.id == validatedPlayerId);

            if(playerIsContained == undefined)
            {
                
                const newPlayer = new User();
                newPlayer.id = validatedPlayerId
                teamInfo.players.push(newPlayer)
            }

            await this.teamRepository.save(teamInfo)
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Error : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }

    async deleteUserFromATeam(teamId : string, playerId : string) : Promise<void> {
        try{
            const validatedTeamId       = z.string().uuid().parse(teamId)
            const validatedPlayerId     = z.string().uuid().parse(playerId) 

            const teamInfo    = (await this.teamRepository.findOne(
                {
                    where : {
                        id : validatedTeamId
                    },
                    relations : {
                        players : true
                    }
                }
            ));
            
            //Remove the player we need to remove
            teamInfo.players = teamInfo.players.filter(player => player.id != validatedPlayerId);
            
            await this.teamRepository.save(teamInfo)

        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Error : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }

}
