import { Connection } from 'typeorm';
import { Filme } from './filmes.entity';

export const filmeProviders = [
  {
    provide: 'FILME_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Filme),
    inject: ['DATABASE_CONNECTION'],
  },
];