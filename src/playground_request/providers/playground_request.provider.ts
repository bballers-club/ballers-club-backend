import { DataSource } from 'typeorm';
import { PlaygroundRequest } from '../entity/playground_request.entity';

export const playgroundRequestProvider = [
  {
    provide: 'PLAYGROUND_REQUEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PlaygroundRequest),
    inject: ['DATA_SOURCE'],
  },
];
