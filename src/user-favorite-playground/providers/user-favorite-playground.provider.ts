import { DataSource } from 'typeorm';
import { UserFavoritePlayground } from '../entity/user-favorite-playground.entity';

export const userFavoritePlaygroundProvider = [
	{
		provide: 'USER_FAVORITE_PLAYGROUND_REPOSITORY',
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(UserFavoritePlayground),
		inject: ['DATA_SOURCE'],
	},
];
