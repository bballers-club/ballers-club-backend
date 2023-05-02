import { Test, TestingModule } from '@nestjs/testing';
import { PlaygroundRequestController } from './playground_request.controller';
import { PlaygroundRequestService } from './providers/playground_request.service';

describe('PlaygroundRequestController', () => {
  let controller: PlaygroundRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaygroundRequestController],
      providers: [PlaygroundRequestService],
    }).compile();

    controller = module.get<PlaygroundRequestController>(
      PlaygroundRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
