import { DataSource } from 'typeorm';
import { Event } from '../entity/event.entity';
import { EVENT_REPOSITORY } from './event.constants';

export const eventProvider = [
	{
		provide: EVENT_REPOSITORY,
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(Event),
		inject: ['DATA_SOURCE'],
	},
];
