import { DataSource } from 'typeorm';
import { Team } from "../model/team.model"

export const teamProvider = [
  {
    provide: 'TEAM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Team),
    inject: ['DATA_SOURCE'],
  },
];
