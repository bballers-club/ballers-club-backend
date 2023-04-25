import { Test, TestingModule } from '@nestjs/testing';
import { FriendshipRequestController } from './friendship_request.controller';
import { FriendshipRequestService } from './friendship_request.service';

describe('FriendshipRequestController', () => {
  let controller: FriendshipRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendshipRequestController],
      providers: [FriendshipRequestService],
    }).compile();

    controller = module.get<FriendshipRequestController>(FriendshipRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
