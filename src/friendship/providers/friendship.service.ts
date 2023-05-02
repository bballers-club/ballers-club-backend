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
    currentUserId: z.string().uuid(),
    userFriendId: z.string().uuid(),
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
  async findAllFriendshipOfOneUser(currentUser: string): Promise<Friendship> {
    try {
      const validatedId = z.string().uuid().parse(currentUser);

      return await this.friendshipRepository.findOneBy({
        currentUserId: validatedId,
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
    currentUserId: string;
    userFriendId: string;
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
    currentUserId: string;
    userFriendId: string;
  }): Promise<void> {
    try {
      const currentUserValidatedId = z
        .string()
        .uuid()
        .parse(friendship.currentUserId);
      const userFriendValidatedId = z
        .string()
        .uuid()
        .parse(friendship.userFriendId);

      await this.friendshipRepository.delete({
        currentUserId: currentUserValidatedId,
        userFriendId: userFriendValidatedId,
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
