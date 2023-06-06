import { Test, TestingModule } from '@nestjs/testing';
import { EventParticipantController } from './event_participant.controller';
import { EventParticipantService } from './providers/services/event_participant.service';

describe('EventParticipantController', () => {
  let controller: EventParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventParticipantController],
      providers: [EventParticipantService],
    }).compile();

    controller = module.get<EventParticipantController>(EventParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
