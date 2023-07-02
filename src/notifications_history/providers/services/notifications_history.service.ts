import { HttpException, Inject, Injectable } from '@nestjs/common';
import { NotificationsHistoryRepository } from '../repositories/notifications_history.repository';
import { CreateNotificationsHistoryDao } from '../../dao/create_notifications_history.dao';
import *  as OneSignal from '@onesignal/node-onesignal';
import { config } from 'dotenv';
import { z } from 'zod';
import { oneSignalClient } from '../../../main';
import { NotificationsHistoryDto } from 'src/notifications_history/dto/notifications_history.dto';

@Injectable()
export class NotificationsHistoryService {

    private notifications = new OneSignal.Notification()

    constructor(private readonly notificationsHistoryRepository : NotificationsHistoryRepository){
        config()
        this.notifications.app_id = process.env.ONE_SIGNAL_APP_ID;
    }

    

    async sendAndSaveNotifications(notification : CreateNotificationsHistoryDao) : Promise<NotificationsHistoryDto> {
        try{    
            const content = z.string().parse(notification.content);
            const title = z.string().parse(notification.title)
            
            
            this.notifications.included_segments = ["Subscribed Users"];
            //Providing the notification content
            this.notifications.contents = {
                'en' : content
            };
            this.notifications.headings = {
                'en' : title
            }

            const oneSignalResponse = await oneSignalClient.createNotification(this.notifications);

            if(oneSignalResponse.errors)
            {
                throw new HttpException(oneSignalResponse.errors,400);
            }

            return await this.notificationsHistoryRepository.createNotifications(notification)
            
        }
        catch(error){
            throw new HttpException(
				{
					status: error.status,
					error: error.message,
				},
				error.status,
				{
					cause: error,
				},
			);
        }
    }
}
