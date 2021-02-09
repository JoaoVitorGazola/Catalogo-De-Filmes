import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { DatabaseModule } from 'src/database/database.module';
import { categoriaProviders } from './categorias.providers';
import { TmdbService } from 'src/tmdb/tmdb.service';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriasService, ...categoriaProviders, TmdbService],
  controllers: [CategoriasController],
  exports: [CategoriasService]
})
export class CategoriasModule { }
