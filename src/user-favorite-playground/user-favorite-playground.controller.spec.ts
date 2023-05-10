import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoritePlaygroundController } from './user-favorite-playground.controller';
import { UserFavoritePlaygroundService } from './providers/user-favorite-playground.service';

describe('UserFavoritePlaygroundController', () => {
  let controller: UserFavoritePlaygroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavoritePlaygroundController],
      providers: [UserFavoritePlaygroundService],
    }).compile();

    controller = module.get<UserFavoritePlaygroundController>(UserFavoritePlaygroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
