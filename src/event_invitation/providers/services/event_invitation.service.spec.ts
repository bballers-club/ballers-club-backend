import { Test, TestingModule } from '@nestjs/testing';
import { EventInvitationService } from './event_invitation.service';

describe('EventInvitationService', () => {
  let service: EventInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventInvitationService],
    }).compile();

    service = module.get<EventInvitationService>(EventInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
