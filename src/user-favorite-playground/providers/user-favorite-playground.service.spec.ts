import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoritePlaygroundService } from './user-favorite-playground.service';

describe('UserFavoritePlaygroundService', () => {
  let service: UserFavoritePlaygroundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavoritePlaygroundService],
    }).compile();

    service = module.get<UserFavoritePlaygroundService>(UserFavoritePlaygroundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
