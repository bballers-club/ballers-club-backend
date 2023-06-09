import { DataSource } from 'typeorm';
import { Friendship } from '../entity/friendship.entity';

export const friendshipProvider = [
	{
		provide: 'FRIENDSHIP_REPOSITORY',
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(Friendship),
		inject: ['DATA_SOURCE'],
	},
];
