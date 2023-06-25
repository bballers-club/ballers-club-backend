import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationsHistoryService } from './providers/services/notifications_history.service'
import { NotificationsHistoryRepository } from './providers/repositories/notifications_history.repository';
import { NotificationsHistoryDto } from './dto/notifications_history.dto';
import { CreateNotificationsHistoryDto } from './dto/create_notifications_history.dto';

@Controller('notifications-history')
export class NotificationsHistoryController {
  constructor(private readonly notificationsHistoryService: NotificationsHistoryService, private readonly notificationsHistoryRepository : NotificationsHistoryRepository) {}

  @Get()
  async getAllNotifications() : Promise<NotificationsHistoryDto[]>{
    return await this.notificationsHistoryRepository.getAllNotifications();
  }

  @Post()
  async createNotification(@Body() createNotificationHistory : CreateNotificationsHistoryDto) : Promise<NotificationsHistoryDto> {
    return await this.notificationsHistoryRepository.createNotifications(createNotificationHistory)
  }

  @Post('/backoffice/send-and-save')
  async createAndSaveNotification(@Body() createNotificationHistory : CreateNotificationsHistoryDto) : Promise<NotificationsHistoryDto> {
    return await this.notificationsHistoryService.sendAndSaveNotifications(createNotificationHistory);
  }
}
