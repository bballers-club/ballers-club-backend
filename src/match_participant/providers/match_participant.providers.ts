import { DataSource } from 'typeorm';
import { MATCH_PARTICIPANT_REPOSITORY } from './match_participant.constants';
import { MatchParticipant } from '../entities/match_participant.entity';

export const matchParticipantProvider = [
	{
		provide: MATCH_PARTICIPANT_REPOSITORY,
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(MatchParticipant),
		inject: ['DATA_SOURCE'],
	},
];
