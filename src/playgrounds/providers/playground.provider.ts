import { DataSource } from 'typeorm/data-source';
import { Playground } from '../entity/playground.entity';

export const playgroundProvider = [
	{
		provide: 'PLAYGROUND_REPOSITORY',
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(Playground),
		inject: ['DATA_SOURCE'],
	},
];
