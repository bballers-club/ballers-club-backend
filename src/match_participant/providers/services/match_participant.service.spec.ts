import { Test, TestingModule } from '@nestjs/testing';
import { MatchParticipantService } from './match_participant.service';

describe('MatchParticipantService', () => {
  let service: MatchParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchParticipantService],
    }).compile();

    service = module.get<MatchParticipantService>(MatchParticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
