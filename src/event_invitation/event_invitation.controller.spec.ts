import { Test, TestingModule } from '@nestjs/testing';
import { EventInvitationController } from './event_invitation.controller';
import { EventInvitationService } from './providers/services/event_invitation.service';

describe('EventInvitationController', () => {
  let controller: EventInvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventInvitationController],
      providers: [EventInvitationService],
    }).compile();

    controller = module.get<EventInvitationController>(EventInvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
