import { Test, TestingModule } from '@nestjs/testing';
import { MatchParticipantController } from './match_participant.controller';
import { MatchParticipantService } from './match_participant.service';

describe('MatchParticipantController', () => {
  let controller: MatchParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchParticipantController],
      providers: [MatchParticipantService],
    }).compile();

    controller = module.get<MatchParticipantController>(MatchParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
