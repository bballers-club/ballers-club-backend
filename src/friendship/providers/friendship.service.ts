import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Friendship } from '../entity/friendship.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';

@Injectable()
export class FriendshipService {
  constructor(
    @Inject('FRIENDSHIP_REPOSITORY')
    private friendshipRepository: Repository<Friendship>,
  ) {}

  private friendshipObjectValidator = z.object({
    userOneId: z.string().uuid(),
    userTwoId: z.string().uuid(),
  });

  async findAll(): Promise<Friendship[]> {
    try {
      return await this.friendshipRepository.find();
    } catch (error) {
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
  async findAllFriendshipOfOneUser(currentUser: string): Promise<Friendship[]> {
    try {
      const validatedId = z.string().uuid().parse(currentUser);
      
      return await this.friendshipRepository.find({
        where : [
          { userOneId : validatedId},
          { userTwoId : validatedId}
        ],
        relations : {
            userOne : true,
            userTwo : true
        }
      });

    } catch (error) {
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

  async create(friendship: {
    userOneId: string;
    userTwoId: string;
  }): Promise<Friendship> {
    try {
      const validatedFriendship =
        this.friendshipObjectValidator.parse(friendship);
      await this.friendshipRepository.create({
        ...validatedFriendship,
      });

      return await this.friendshipRepository.save(validatedFriendship);
    } catch (error) {
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

  async deleteFriendship(friendship: {
    userOneId: string;
    userTwoId: string;
  }): Promise<void> {
    try {
      const currentUserValidatedId = z
        .string()
        .uuid()
        .parse(friendship.userOneId);
      const userFriendValidatedId = z
        .string()
        .uuid()
        .parse(friendship.userTwoId);

      await this.friendshipRepository.delete({
        userOneId: currentUserValidatedId,
        userTwoId: userFriendValidatedId,
      });
    } catch (error) {
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
