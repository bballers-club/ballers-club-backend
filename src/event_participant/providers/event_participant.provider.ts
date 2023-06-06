import { DataSource } from 'typeorm';
import { EVENT_PARTICIPANT_REPOSITORY } from './event_participant.constants';
import { EventParticipant } from '../entity/event_participant.entity';

export const eventParticipantProvider = [
	{
		provide: EVENT_PARTICIPANT_REPOSITORY,
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(EventParticipant),
		inject: ['DATA_SOURCE'],
	},
];
