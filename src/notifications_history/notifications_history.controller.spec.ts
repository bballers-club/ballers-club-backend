import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsHistoryController } from './notifications_history.controller';
import { NotificationsHistoryService } from './notifications_history.service';

describe('NotificationsHistoryController', () => {
  let controller: NotificationsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsHistoryController],
      providers: [NotificationsHistoryService],
    }).compile();

    controller = module.get<NotificationsHistoryController>(NotificationsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
