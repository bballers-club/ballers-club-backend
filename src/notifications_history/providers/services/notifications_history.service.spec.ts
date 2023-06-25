import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsHistoryService } from './notifications_history.service';

describe('NotificationsHistoryService', () => {
  let service: NotificationsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsHistoryService],
    }).compile();

    service = module.get<NotificationsHistoryService>(NotificationsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
