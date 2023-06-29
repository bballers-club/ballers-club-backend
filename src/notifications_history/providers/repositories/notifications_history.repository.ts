import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { z } from "zod";
import { NOTIFICATIONS_HISTORY_REPOSITORY } from "../notifications_history.constats";
import { NotificationsHistory } from "src/notifications_history/entity/notifications_history.entity";
import { CreateNotificationsHistoryDao } from '../../dao/create_notifications_history.dao';

@Injectable()
export class NotificationsHistoryRepository {
    constructor(
		@Inject(NOTIFICATIONS_HISTORY_REPOSITORY)
		private notificationHistoryRepository: Repository<NotificationsHistory>,
	) {}

    async getAllNotifications() : Promise<NotificationsHistory[]> {
        try{
            return await this.notificationHistoryRepository.find({
				relations : {
					sender : true
				}
			});
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

    async createNotifications(notification_history : CreateNotificationsHistoryDao) : Promise<NotificationsHistory> {
        try{
            const created_notification_history = await this.notificationHistoryRepository.create({
                ...notification_history
            });

            return await this.notificationHistoryRepository.save(created_notification_history);
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