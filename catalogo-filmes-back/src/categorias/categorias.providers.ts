import { Connection } from 'typeorm';
import { Categoria } from './categorias.entity';

export const categoriaProviders = [
  {
    provide: 'CATEGORIA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Categoria),
    inject: ['DATABASE_CONNECTION'],
  },
];