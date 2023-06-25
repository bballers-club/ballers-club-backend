import { Module } from '@nestjs/common';
import { NotificationsHistoryService } from './providers/services/notifications_history.service';
import { NotificationsHistoryController } from './notifications_history.controller';
import { NotificationsHistoryRepository } from './providers/repositories/notifications_history.repository';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { notificationsHistoryProvider } from './providers/notifications_history.providers';

@Module({
  imports : [DatabaseModule],
  controllers: [
    NotificationsHistoryController
  ],
  providers: [...notificationsHistoryProvider,NotificationsHistoryService, NotificationsHistoryRepository]
})
export class NotificationsHistoryModule {}
