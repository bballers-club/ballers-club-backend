import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserFavoritePlayground } from '../entity/user-favorite-playground.entity';
import { z } from 'zod';

@Injectable()
export class UserFavoritePlaygroundService {
  constructor(
		@Inject('USER_FAVORITE_PLAYGROUND_REPOSITORY')
		private userFavoritePlaygroundRepository: Repository<UserFavoritePlayground>,
	) {}


  async create(createUserFavoritePlayground: {
    userId : string,
    playgroundId : string
  }) : Promise<UserFavoritePlayground> {
    try{
      const validatedUserFavoritePlayground = z.object({
        userId : z.string().uuid(),
        playgroundId : z.string().uuid()
      }).parse(createUserFavoritePlayground);

      const createdValidatedUserFavoritePlayground = await this.userFavoritePlaygroundRepository.create({
        ...validatedUserFavoritePlayground
      })

      return await this.userFavoritePlaygroundRepository.save(createdValidatedUserFavoritePlayground)
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
				},
			);
    }
  }

  async findAllFavoriteOfUser(userId : string) : Promise<UserFavoritePlayground[]> {
    try{
      const validatedUserId = z.string().uuid().parse(userId)

      return await this.userFavoritePlaygroundRepository.find({
        relations: {
          playground : true
        },
        where : {
          userId : validatedUserId
        },
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
				},
			);
    }
  }

  async removeFavorite(userId: String, playgroundId : string) : Promise<void> {
    try{
      const validatedUserId = z.string().uuid().parse(userId)
      const validatedPlaygroundId = z.string().uuid().parse(playgroundId)

      await this.userFavoritePlaygroundRepository.createQueryBuilder()
      .delete()
      .from(UserFavoritePlayground)
      .where("userId = :userId AND playgroundId = :playgroundId ", {userId : validatedUserId, playgroundId : validatedPlaygroundId} )
      .execute()
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
				},
			);
    }
  }
}
