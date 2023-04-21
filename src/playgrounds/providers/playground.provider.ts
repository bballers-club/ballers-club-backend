import { DataSource } from "typeorm/data-source";
import { Playground } from "../model/playground.model";

export const playgroundProvider = [
    {
      provide: 'PLAYGROUND_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Playground),
      inject: ['DATA_SOURCE'],
    },
  ];