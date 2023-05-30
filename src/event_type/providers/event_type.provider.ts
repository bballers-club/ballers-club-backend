import { DataSource } from 'typeorm';
import { EventType } from '../entity/event_type.entity';
import { EVENT_TYPE_REPOSITORY } from './event_type.constants';

export const eventTypeProvider = [
	{
		provide: EVENT_TYPE_REPOSITORY,
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(EventType),
		inject: ['DATA_SOURCE'],
	},
];
