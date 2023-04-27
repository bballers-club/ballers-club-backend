import { DataSource } from 'typeorm';
import { FriendshipRequest } from '../entity/friendship_request.entity';

export const friendshipRequestProvider = [
    {
        provide: 'FRIENDSHIP_REQUEST_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(FriendshipRequest),
        inject: ['DATA_SOURCE'],
    },
];