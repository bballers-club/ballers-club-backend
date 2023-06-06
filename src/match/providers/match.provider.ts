import { DataSource } from 'typeorm';
import { Match } from '../entity/match.entity';
import { MATCH_REPOSITORY } from './match.constants';

export const matchProvider = [
	{
		provide: MATCH_REPOSITORY,
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(Match),
		inject: ['DATA_SOURCE'],
	},
];
