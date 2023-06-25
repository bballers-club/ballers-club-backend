import { DataSource } from 'typeorm';
import { NOTIFICATIONS_HISTORY_REPOSITORY } from './notifications_history.constats';
import { NotificationsHistory } from '../entity/notifications_history.entity';

export const notificationsHistoryProvider = [
	{
		provide: NOTIFICATIONS_HISTORY_REPOSITORY,
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(NotificationsHistory),
		inject: ['DATA_SOURCE'],
	},
];
