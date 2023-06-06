import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { z } from "zod"
import { Repository } from "typeorm";
import { MATCH_REPOSITORY } from "../match.constants";
import { Match } from "src/match/entity/match.entity";

@Injectable()
export class MatchRepository {
    constructor(
		@Inject(MATCH_REPOSITORY)
		private matchRepository: Repository<Match>,
	) {}

    async findAll() : Promise<Match[]> {
        try{
            return await this.matchRepository.find();
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

    async findMatchesFromEvent(eventId : string) : Promise<Match[]> {
        try{
            const validatedEventId = z.string().uuid().parse(eventId)
            
            return await this.matchRepository.find({
                where : {
                    eventId : validatedEventId
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

    async findMatchById(matchId : string) : Promise<Match> {
        try{
            const validatedMatchId = z.string().uuid().parse(matchId);

            return await this.matchRepository.findOne({
                where : {
                    id : validatedMatchId
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

    async createMatch(match : {
        eventId : string,
    }) : Promise<Match> {
        try{
            const validatedId = z.string().uuid().parse(match.eventId);
            
            const createdMatch = await this.matchRepository.create({
                eventId : validatedId
            });

            return await this.matchRepository.save(createdMatch)
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

    async updateMatch(match : {
        id : string,
        teamOnePoint ?: number
        teamTwoPoint ?: number,
        winningTeam ?: number
    }) : Promise<Match> {
        try{
            const validatedId = z.string().uuid().parse(match.id);

            await this.matchRepository.update(validatedId,match);

            return await this.matchRepository.findOne({
                where : {
                    id : validatedId
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
}