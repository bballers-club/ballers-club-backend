import { Test, TestingModule } from '@nestjs/testing';
import { EventParticipantService } from './event_participant.service';

describe('EventParticipantService', () => {
  let service: EventParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventParticipantService],
    }).compile();

    service = module.get<EventParticipantService>(EventParticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
